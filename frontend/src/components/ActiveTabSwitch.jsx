import { useChatStore } from "../store/useChatStore.js";

const ActiveTabSwitch = () => {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="tabs tabs-boxed bg-transparent p-2 m- items-center justify-center border-b border-slate-700/50">
      <button
        onClick={() => setActiveTab("chats")}
        className={`tab w-1/2 rounded-xl ${
          activeTab === "chats"
            ? "bg-cyan-500/20 text-cyan-400"
            : "text-slate-400"
        }`}
      >
        Chats
      </button>

      <button
        onClick={() => setActiveTab("contacts")}
        className={`tab w-1/2 rounded-xl ${
          activeTab === "contacts"
            ? "bg-cyan-500/20 text-cyan-400"
            : "text-slate-400"
        }`}
      >
        Contacts
      </button>
    </div>
  );
};
export default ActiveTabSwitch;
