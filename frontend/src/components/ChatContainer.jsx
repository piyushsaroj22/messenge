import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import { useEffect, useRef } from "react";
import { MessagesLoadingSkeleton } from "./SkeletonLoading";
import { CheckCheckIcon, CheckIcon } from "lucide-react";

const ChatContainer = () => {
  console.log("ChatContainer Render");
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    markMessagesAsSeen,
    typingUsers,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
    markMessagesAsSeen(selectedUser._id);
  }, [selectedUser, getMessagesByUserId, markMessagesAsSeen]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, typingUsers]);

  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-6 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-1">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}
              >
                <div
                  className={`chat-bubble relative wrap-break-word overflow-wrap-anywhere  ${
                    msg.senderId === authUser._id
                      ? "bg-cyan-600 text-white rounded-t-2xl rounded-l-2xl pt-0 border border-cyan-700/50 font-medium"
                      : "bg-slate-800 text-slate-200 rounded-t-2xl rounded-r-2xl pt-0 border border-slate-700/50 font-medium"
                  }`}
                >
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="Shared"
                      className="w-full h-84 mt-3 object-cover rounded-lg"
                    />
                  )}
                  {msg.text && <p className="mt-2">{msg.text}</p>}
                  <div
                    className={`mt-1 flex items-center gap-1 ${
                      msg.senderId === authUser._id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <span className="text-[0.70rem] opacity-75">
                      {msg.createdAt &&
                        new Date(msg.createdAt).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                    </span>

                    {msg.senderId === authUser._id && (
                      <>
                        {msg.status === "sent" && (
                          <CheckIcon size={15} className="text-slate-300" />
                        )}

                        {msg.status === "delivered" && (
                          <CheckCheckIcon
                            size={15}
                            className="text-slate-300"
                          />
                        )}

                        {msg.status === "seen" && (
                          <CheckCheckIcon size={15} className="text-sky-400" />
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {typingUsers[selectedUser._id] && (
              <div className="chat chat-start">
                <div className="chat-bubble bg-slate-800 border border-slate-700 rounded-t-2xl rounded-r-2xl px-4 py-3">
                  <div className="flex items-center gap-1 mt-1">
                    <span className="w-1 h-1 bg-slate-300 rounded-full animate-typing-bounce"></span>
                    <span
                      className="w-1 h-1 bg-slate-300 rounded-full animate-typing-bounce"
                      style={{ animationDelay: "0.15s" }}
                    ></span>
                    <span
                      className="w-1 h-1 bg-slate-300 rounded-full animate-typing-bounce"
                      style={{ animationDelay: "0.3s" }}
                    ></span>
                  </div>
                </div>
              </div>
            )}

            {/* 👇 scroll target */}
            <div ref={messageEndRef} />
          </div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        )}
      </div>
      <MessageInput />
    </>
  );
};

export default ChatContainer;
