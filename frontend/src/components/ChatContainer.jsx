import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";

const ChatContainer = () => {
  const { selectedUser, getMessagesByUserId, messages } = useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
  }, [selectedUser, getMessagesByUserId]);

  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-6 overflow-y-auto py-8">
        {messages.length > 0 ? (
          <div className="max-w-3xl mx-auto space-y-1">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}
              >
                <div
                  className={`chat-bubble  relative ${
                    msg.senderId === authUser._id
                      ? "bg-cyan-600 text-white rounded-t-2xl rounded-l-2xl pt-0 border border-cyan-700/50 font-medium"
                      : "bg-slate-800 text-slate-200 rounded-t-2xl rounded-r-2xl pt-0 border border-slate-700/50 font-medium"
                  }`}
                >
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="Shared"
                      className="rounded-lg h-48 object-cover"
                    />
                  )}
                  {msg.text && <p className="mt-2">{msg.text}</p>}
                  <p
                    className={`text-[0.70rem] mt-1 opacity-75 flex items-center gap-1 ${msg.senderId === authUser._id ? "justify-end" : "justify-start"}`}
                  >
                    {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {/* 👇 scroll target */}
            {/* <div ref={messageEndRef} /> */}
          </div>
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        )}
      </div>
    </>
  );
};

export default ChatContainer;
