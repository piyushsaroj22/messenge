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
    isUsersLoading,
    setSelectedUser,
    searchQuery,
  } = useChatStore();
  const { onlineUsers } = useAuthStore();

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
        filteredChats.map((chat) => (
          <div
            key={chat._id}
            className="p-4 cursor-pointer border-b border-slate-700/50 hover:bg-slate-800/50 transition-all duration-200 rounded-xl" // bg-cyan-500/5  hover:bg-cyan-500/20 transition-colors duration-200 ease-in-out
            onClick={() => setSelectedUser(chat)}
          >
            <div className="flex items-center gap-3">
              <div
                className={`avatar ${onlineUsers.includes(chat._id) ? "avatar-online border-2 rounded-full border-green-500" : "avatar-offline border-2 rounded-full border-slate-700/50"}`}
                // ${onlineUsers.includes(chat._id) ? "online" : "offline"} isko baad me iske uper wale line pe dalna hai
              >
                <div className="size-12 rounded-full">
                  <img
                    src={chat.profilePicture || "/avatar.png"}
                    alt={chat.fullName}
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h4 className="text-slate-200 font-medium text-lg truncate">
                    {chat.fullName}
                  </h4>

                  {chat.lastMessage && (
                    <span className="text-[11px] text-slate-400">
                      {new Date(chat.lastMessage.createdAt).toLocaleTimeString(
                        [],
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center mt-1">
                  <p className="text-sm text-slate-400 truncate max-w-[180px]">
                    {chat.lastMessage
                      ? chat.lastMessage.image
                        ? "📷 Photo"
                        : chat.lastMessage.text
                      : "No messages yet"}
                  </p>

                  {chat.unreadCount > 0 && (
                    <div className="min-w-5 h-5 px-1 rounded-full bg-cyan-500 text-black text-[11px] font-bold flex items-center justify-center">
                      {chat.unreadCount}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : searchQuery.trim() !== "" ? (
        <NoResultsFound />
      ) : (
        <NoChatsFound />
      )}
    </>
  );
};

export default ChatsList;
