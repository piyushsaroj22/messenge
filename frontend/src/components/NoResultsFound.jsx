import { SearchX } from "lucide-react";

const NoResultsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 text-center">
      <SearchX className="w-14 h-14 text-slate-500 mb-4" />

      <h3 className="text-lg font-semibold text-slate-200">No results found</h3>

      <p className="text-sm text-slate-400 mt-1">
        Try searching with a different name.
      </p>
    </div>
  );
};

export default NoResultsFound;
