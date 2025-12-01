"use client";

interface AppbarProps {
  user?: { name?: string | null };
  onSignin: () => void;
  onSignout: () => void;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  return (
    <header
      className="
        fixed top-0 left-0 w-full h-20
        px-10
        flex items-center justify-between
        backdrop-blur-xl bg-black/20
        border-b border-white/10
        shadow-[0_4px_30px_rgba(0,0,0,0.2)]
        z-50
      "
    >
      {/* LOGO */}
      <div className="flex items-center gap-3">
        <span className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
          PayTM
        </span>
        <span className="text-green-400 text-3xl animate-pulse">💸</span>
      </div>

      {/* BUTTON */}
      <button
        onClick={user ? onSignout : onSignin}
        className="
          px-6 py-2.5 rounded-lg
          bg-gradient-to-r from-blue-600 to-cyan-500
          text-white font-semibold
          shadow-md hover:shadow-xl 
          transition-all hover:scale-[1.05]
          whitespace-nowrap
        "
      >
        {user ? "Logout" : "Login"}
      </button>
    </header>
  );
};
