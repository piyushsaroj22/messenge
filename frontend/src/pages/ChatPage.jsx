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
    <div className="relative w-full max-w-6xl h-200 z-2 items-center justify-center">
      <BorderAnimatedContainer>
        {/* LEFT SIDE */}
        <div className="w-full md:w-1/3 flex flex-col ">
          <ProfileHeader />
          <ProfileSearchBar />
          <ActiveTabSwitch />

          <div className="flex-1 overflow-y-auto px-4 space-y-2 ">
            {activeTab === "chats" ? <ChatsList /> : <ContactList />}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 flex flex-col bg-slate-900/80 border-l border-slate-700/50">
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>
      </BorderAnimatedContainer>
    </div>
  );
}
export default ChatPage;
