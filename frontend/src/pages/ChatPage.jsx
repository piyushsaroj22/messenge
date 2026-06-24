import { Link } from "react";
import { useAuthStore } from "../store/useAuthStore";

const ChatPage = () => {
  const { logout } = useAuthStore();
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-4 z-2">
      <h1>Chat Page</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default ChatPage;
