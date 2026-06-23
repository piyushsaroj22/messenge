const BackgroundBoxContainer = ({ children }) => {
  return (
    <div className="w-full flex items-center justify-center bg-slate-900">
      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
        <div className="w-full h-full [background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.cyan.500)_86%,_theme(colors.cyan.300)_90%,_theme(colors.cyan.500)_94%,_theme(colors.slate.600/.48))_border-box] rounded-2xl border border-transparent animate-border flex overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BackgroundBoxContainer;
