import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  typingUsers: {},
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  searchQuery: "",
  isSoundEnabled: localStorage.getItem("isSoundEnabled") === "true",

  updateChatPreview: ({ message, unreadCountMode = "preserve" }) => {
    set((state) => {
      const { authUser } = useAuthStore.getState();

      if (!authUser || !message) return {};

      const partnerId =
        message.senderId === authUser._id
          ? message.receiverId
          : message.senderId;

      const chatIndex = state.chats.findIndex((chat) => chat._id === partnerId);

      if (chatIndex === -1) return {};

      const updatedChats = [...state.chats];
      const currentUnreadCount = updatedChats[chatIndex].unreadCount || 0;

      let unreadCount = currentUnreadCount;

      if (unreadCountMode === "increment") {
        unreadCount = currentUnreadCount + 1;
      } else if (unreadCountMode === "zero") {
        unreadCount = 0;
      }

      const updatedChat = {
        ...updatedChats[chatIndex],
        lastMessage: message,
        unreadCount,
      };

      updatedChats.splice(chatIndex, 1);
      updatedChats.unshift(updatedChat);

      return {
        chats: updatedChats,
      };
    });
  },

  upsertMessage: (message) => {
    set((state) => {
      const index = state.messages.findIndex(
        (msg) =>
          msg._id === message._id ||
          (msg.clientId && msg.clientId === message.clientId),
      );

      if (index === -1) {
        return {
          messages: [...state.messages, message],
        };
      }

      const updatedMessages = [...state.messages];
      updatedMessages[index] = {
        ...updatedMessages[index],
        ...message,
      };

      return {
        messages: updatedMessages,
      };
    });
  },

  setTypingUser: (userId, isTyping) => {
    set((state) => ({
      typingUsers: {
        ...state.typingUsers,
        [userId]: isTyping,
      },
    }));
  },

  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },

  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },

  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
  },

  getAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/contacts");
      set({ allContacts: res.data.contacts });
    } catch (error) {
      console.error("Error fetching contacts:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMyChatPartners: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/chats");
      set({ chats: res.data.chatPartners });
    } catch (error) {
      console.error("Error fetching my chats:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data.messages });
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error(error.response?.data?.message || "Messages Fetching failed");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser } = get();
    const { authUser } = useAuthStore.getState();

    // const tempId = `temp-${Date.now()}`;
    const clientId = crypto.randomUUID();

    const optimisticMessage = {
      _id: clientId, // Use clientId as a temporary ID for optimistic UI
      clientId, // Store the clientId for later reference
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      status: "sent",
      isOptimistic: true,
    };

    // Show optimistic message
    get().upsertMessage(optimisticMessage);

    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        {
          ...messageData,
          clientId,
        },
      );

      // Replace optimistic message with real message
      get().upsertMessage(res.data.newMessage);
      get().updateChatPreview({
        message: res.data.newMessage,
        unreadCountMode: "preserve",
      });
    } catch (error) {
      // Remove optimistic message
      set((state) => ({
        // messages: state.messages.filter((msg) => msg._id !== tempId),
        messages: state.messages.filter((msg) => msg.clientId !== clientId),
      }));

      console.error("Error sending message:", error);
      toast.error(error.response?.data?.message || "Message sending failed");
    }
  },

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;

    if (!socket) return;

    socket.off("newMessage");
    socket.off("messageDelivered");
    socket.off("messagesSeen");
    socket.off("userTyping");
    socket.off("userStoppedTyping");
    socket.off("userUpdated");

    socket.on("newMessage", (newMessage) => {
      get().setTypingUser(newMessage.senderId, false); // wese abhi iski jarurat nahi hia lekin thik hai
      const { selectedUser, isSoundEnabled } = get();

      const { authUser } = useAuthStore.getState();

      const isCurrentChat =
        selectedUser &&
        ((newMessage.senderId === selectedUser._id &&
          newMessage.receiverId === authUser._id) ||
          (newMessage.senderId === authUser._id &&
            newMessage.receiverId === selectedUser._id));

      if (isCurrentChat) {
        // Message aa gaya matlab sender ab type nahi kar raha and Stop typing indicator immediately
        get().setTypingUser(newMessage.senderId, false);
        get().upsertMessage(newMessage);

        if (newMessage.senderId === selectedUser._id) {
          get().markMessagesAsSeen(newMessage.senderId);
        }
      }

      get().updateChatPreview({
        message: newMessage,
        unreadCountMode:
          newMessage.senderId === authUser._id
            ? "preserve"
            : newMessage.receiverId === authUser._id && !isCurrentChat
              ? "increment"
              : "zero",
      });

      // Play notification sound
      const isIncomingMessage = newMessage.receiverId === authUser._id;

      if (isSoundEnabled && isIncomingMessage) {
        const notificationSound = new Audio("/sounds/apple_ting.mp3");
        notificationSound.currentTime = 0;
        notificationSound.play().catch((err) => {
          console.log("Audio play failed:", err);
        });
      }
    });

    socket.on("messageDelivered", ({ clientId }) => {
      set((state) => ({
        messages: state.messages.map((msg) =>
          msg.clientId === clientId ? { ...msg, status: "delivered" } : msg,
        ),
      }));
    });

    socket.on("messagesSeen", ({ messageIds }) => {
      set((state) => ({
        messages: state.messages.map((msg) =>
          messageIds.includes(msg._id.toString())
            ? { ...msg, status: "seen" }
            : msg,
        ),
      }));
    });

    socket.on("userTyping", ({ senderId }) => {
      get().setTypingUser(senderId, true);
    });

    socket.on("userStoppedTyping", ({ senderId }) => {
      get().setTypingUser(senderId, false);
    });

    socket.on("userUpdated", (updatedUser) => {
      set((state) => ({
        chats: state.chats.map((chat) =>
          chat._id === updatedUser._id
            ? {
                ...chat,
                fullName: updatedUser.fullName,
                profilePicture: updatedUser.profilePicture,
              }
            : chat,
        ),

        allContacts: state.allContacts.map((contact) =>
          contact._id === updatedUser._id
            ? {
                ...contact,
                fullName: updatedUser.fullName,
                profilePicture: updatedUser.profilePicture,
              }
            : contact,
        ),

        selectedUser:
          state.selectedUser?._id === updatedUser._id
            ? {
                ...state.selectedUser,
                fullName: updatedUser.fullName,
                profilePicture: updatedUser.profilePicture,
              }
            : state.selectedUser,
      }));
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
    socket.off("messageDelivered");
    socket.off("messagesSeen");
    socket.off("userTyping");
    socket.off("userStoppedTyping");
    socket.off("userUpdated");
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
  }, //=====================================================Newly Added Function=====================================================

  markMessagesAsSeen: async (userId) => {
    try {
      await axiosInstance.patch(`/messages/seen/${userId}`);

      const { selectedUser } = get();

      if (selectedUser?._id === userId) {
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat._id === userId ? { ...chat, unreadCount: 0 } : chat,
          ),
        }));
      }
    } catch (error) {
      console.error("Error marking messages as seen:", error);
    }
  }, //=====================================================Newly Added Function=====================================================
}));
