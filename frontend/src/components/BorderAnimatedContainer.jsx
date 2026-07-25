const BorderAnimatedContainer = ({ children }) => {
  return (
    <div
      className="w-full h-full min-h-0 rounded-2xl border border-transparent animate-border flex flex-col md:flex-row overflow-hidden"
      style={{
        background:
          "linear-gradient(45deg,#172033,#1e293b 50%,#172033) padding-box, conic-gradient(from var(--border-angle), rgba(71,85,105,0.48) 80%, rgb(6 182 212) 86%, rgb(103 232 249) 90%, rgb(6 182 212) 94%, rgba(71,85,105,0.48)) border-box",
      }}
    >
      {children}
    </div>
  );
};

export default BorderAnimatedContainer;

// Shayad baad me is file ko delete kar dunga
