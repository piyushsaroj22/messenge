import { useChatStore } from "../store/useChatStore";

import NoConversationPlaceholder from "../components/NoConversationPlaceholder";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import ProfileSearchBar from "../components/ProfileSearchBar";
import { useEffect } from "react";

function ChatPage() {
  const {
    activeTab,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  useEffect(() => {
    subscribeToMessages();

    return () => {
      unsubscribeFromMessages();
    };
  }, [subscribeToMessages, unsubscribeFromMessages]);

  return (
    <div className="relative w-full h-[calc(100dvh-2rem)] max-w-6xl min-h-0 z-2">
      <BorderAnimatedContainer>
        {/* LEFT SIDE */}
        <div
          className={`w-full md:w-[360px] md:min-w-[320px] flex-col min-h-0 border-slate-700/50 ${selectedUser ? "hidden md:flex" : "flex"} md:border-r`}
        >
          <ProfileHeader />
          <ProfileSearchBar />
          <ActiveTabSwitch />

          <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
            {activeTab === "chats" ? <ChatsList /> : <ContactList />}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          className={`flex-1 min-w-0 min-h-0 flex-col bg-slate-900/80 ${selectedUser ? "flex" : "hidden md:flex"}`}
        >
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>
      </BorderAnimatedContainer>
    </div>
  );
}
export default ChatPage;
