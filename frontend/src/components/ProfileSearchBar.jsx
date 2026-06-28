import { Search } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const ProfileSearchBar = () => {
  const { searchQuery, setSearchQuery } = useChatStore();

  return (
    <div className="relative px-4 py-3 border-b border-slate-700/50">
      <Search
        className="absolute left-7 top-1/2 -translate-y-1/2
        w-4 h-4 text-slate-400"
      />

      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="input input-bordered w-full
        pl-10 bg-slate-800 border-slate-700"
      />
    </div>
  );
};

export default ProfileSearchBar;
