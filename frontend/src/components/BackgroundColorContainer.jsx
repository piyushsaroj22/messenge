const BackgroundColorContainer = ({ children }) => {
  return (
    <div className="h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px] z-1" />
      <div className="absolute bottom-0 -right-4 size-96 md:size-96 bg-cyan-500 opacity-20 blur-[100px] z-1" />
      {children}
    </div>
  );
};

export default BackgroundColorContainer;
