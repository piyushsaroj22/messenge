import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { XIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const ChatHeader = () => {
  const { selectedUser, users, setSelectedUser } = useChatStore();
  const currentUser = users[selectedUser._id] || selectedUser;

  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };

    window.addEventListener("keydown", handleEscKey);

    // cleanup function
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <div className="flex justify-between items-center bg-slate-800/50 border-b border-slate-700/50 h-17 px-4 sm:px-6 py-3 shrink-0">
      <div className="flex items-center space-x-3 min-w-0">
        <div
          className={`avatar ${isOnline ? "avatar-online border-2 rounded-full border-green-500" : "avatar-offline border-2 rounded-full border-slate-700/50"}`} // ${isOnline ? "online" : "offline"}
        >
          <div className="w-10 sm:w-12 rounded-full">
            <img
              src={currentUser.profilePicture || "/avatar.png"}
              alt={currentUser.fullName}
            />
          </div>
        </div>

        <div className="flex flex-col min-w-0">
          <h3 className="text-slate-200 font-medium text-base sm:text-xl truncate max-w-[180px] sm:max-w-none">
            {currentUser.fullName}
          </h3>
          <p
            className={`text-xs ${isOnline ? "text-green-400" : "text-slate-400"}`}
          >
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <button onClick={() => setSelectedUser(null)} className="shrink-0">
        <XIcon className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer" />
      </button>
    </div>
  );
};

export default ChatHeader;
