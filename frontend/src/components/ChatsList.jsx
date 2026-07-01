import { UsersLoadingSkeleton } from "./SkeletonLoading.jsx";
import { useAuthStore } from "../store/useAuthStore.js";
import { useChatStore } from "../store/useChatStore.js";
import NoChatsFound from "./NoChatsFound.jsx";
import NoResultsFound from "./NoResultsFound.jsx";
import { useEffect } from "react";

const ChatsList = () => {
  const {
    getMyChatPartners,
    chats,
    users, // ⭐ NEW
    isUsersLoading,
    setSelectedUser,
    selectedUser, // isko contactList me bhi dalna hai
    typingUsers, // isko contactList me bhi dalna hai
    searchQuery,
  } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const truncateText = (text, maxLength = 20) =>
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text; // isko contactList me bhi dalna hai

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  const filteredChats = chats.filter((chat) =>
    chat.fullName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  // if (filteredChats.length === 0) return <NoChatsFound />;

  return (
    <>
      {filteredChats.length > 0 ? (
        filteredChats.map((chat) => {
          const user = users[chat._id] || chat;

          return (
            <div
              key={chat._id}
              className={`py-3 px-4 cursor-pointer border-b border-slate-700/50 rounded-xl transition-all duration-200
            ${
              selectedUser?._id === chat._id
                ? "bg-cyan-500/15 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.15)]"
                : "hover:bg-slate-800/50"
            }`}
              onClick={() => setSelectedUser(chat)}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`avatar ${onlineUsers.includes(chat._id) ? "avatar-online border-2 rounded-full border-green-500" : "avatar-offline border-2 rounded-full border-slate-700/50"}`}
                  // ${onlineUsers.includes(chat._id) ? "online" : "offline"} isko baad me iske uper wale line pe dalna hai
                >
                  <div className="size-12 rounded-full">
                    <img
                      src={user.profilePicture || "/avatar.png"}
                      alt={user.fullName}
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    {" "}
                    <h4 className="text-slate-200 font-medium text-lg truncate">
                      {user.fullName}
                    </h4>
                    {chat.lastMessage && (
                      <span className="text-[11px] text-slate-400 ">
                        {new Date(
                          chat.lastMessage.createdAt,
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center mt-1">
                    <p
                      className={`text-sm truncate max-w-[180px] ${
                        typingUsers[chat._id]
                          ? "text-cyan-400 italic"
                          : "text-slate-400"
                      }`}
                    >
                      {typingUsers[chat._id]
                        ? "Typing..."
                        : chat.lastMessage
                          ? chat.lastMessage.image
                            ? "📷 Photo"
                            : truncateText(chat.lastMessage.text, 20)
                          : "No messages yet"}
                    </p>{" "}
                    {chat.unreadCount > 0 && (
                      <div className="min-w-5 h-5 px-1 rounded-full bg-cyan-500 text-black text-[11px] font-bold flex items-center justify-center">
                        {chat.unreadCount}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : searchQuery.trim() !== "" ? (
        <NoResultsFound />
      ) : (
        <NoChatsFound />
      )}
    </>
  );
};

export default ChatsList;
