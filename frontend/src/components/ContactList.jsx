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
    setSelectedUser,
    isUsersLoading,
    searchQuery,
  } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  const filteredChats = allContacts.filter(
    (contact) =>
      contact.fullName.toLowerCase().includes(searchQuery.toLowerCase()), // Agar me chahu to isko number se bhi search kar sakta hu, bas ye change karna hoga contact.fullName ke jagah contact.phoneNumber lekin me isme number ka input liya hi nahi hu userModel me
  );

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  return (
    <>
      {filteredChats.length > 0 ? (
        filteredChats.map((contact) => (
          <div
            key={contact._id}
            className="p-4 cursor-pointer border-b border-slate-700/50"
            onClick={() => setSelectedUser(contact)}
          >
            <div className="flex items-center gap-3">
              <div
                className={`avatar ${onlineUsers.includes(contact._id) ? "avatar-online" : "avatar-offline"}`}
              >
                <div className="size-12 rounded-full">
                  <img src={contact.profilePicture || "/avatar.png"} />
                </div>
              </div>
              <div className="flex flex-col">
                <h4 className="text-slate-200 font-medium">
                  {contact.fullName}
                </h4>
                <p
                  className={`text-[12px] ${onlineUsers.includes(contact._id) ? "text-green-400" : "text-slate-400"}`}
                >
                  {onlineUsers.includes(contact._id) ? "Online" : "Offline"}
                </p>
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

export default ContactList;
