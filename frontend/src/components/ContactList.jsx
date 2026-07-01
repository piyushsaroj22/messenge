import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { UsersLoadingSkeleton } from "./SkeletonLoading";
import NoChatsFound from "./NoChatsFound";
import NoResultsFound from "./NoResultsFound";

const ContactList = () => {
  const {
    getAllContacts,
    allContacts,
    users, // ⭐ NEW
    setSelectedUser,
    selectedUser,
    isUsersLoading,
    searchQuery,
  } = useChatStore();

  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  const filteredContacts = allContacts.filter((contact) =>
    contact.fullName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  return (
    <>
      {filteredContacts.length > 0 ? (
        filteredContacts.map((contact) => {
          const user = users[contact._id] || contact;

          return (
            <div
              key={contact._id}
              className={`py-3 px-4 cursor-pointer border-b border-slate-700/50 rounded-xl transition-all duration-200
            ${
              selectedUser?._id === contact._id
                ? "bg-cyan-500/15 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.15)]"
                : "hover:bg-slate-800/50"
            }`}
              onClick={() => setSelectedUser(contact)}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`avatar ${
                    onlineUsers.includes(contact._id)
                      ? "avatar-online border-2 rounded-full border-green-500"
                      : "avatar-offline border-2 rounded-full border-slate-700/50"
                  }`}
                >
                  <div className="size-12 rounded-full">
                    <img
                      src={user.profilePicture || "/avatar.png"}
                      alt={user.fullName}
                    />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-slate-200 font-medium text-lg truncate">
                    {user.fullName}
                  </h4>

                  <p className="text-sm text-slate-400 truncate">
                    {contact.about}
                  </p>
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

export default ContactList;
