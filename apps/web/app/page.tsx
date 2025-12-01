"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0a0f1f] to-[#1e3a8a] text-white">

      {/* 🌟 NAVBAR */}
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
          <span className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            PayTM
          </span>
          <span className="text-green-400 text-3xl animate-pulse">💸</span>
        </div>

        {/* LOGIN / LOGOUT BUTTON */}
        <button
          onClick={session?.user ? () => signOut() : () => signIn()}
          className="
            px-6 py-2.5 
            rounded-lg 
            bg-gradient-to-r from-blue-600 to-cyan-500
            text-white font-semibold
            shadow-md hover:shadow-xl
            transition-all hover:scale-[1.05]
          "
        >
          {session?.user ? "Logout" : "Login"}
        </button>
      </header>

      {/* HERO SECTION */}
      <main className="px-6 md:px-12 pt-[140px]">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Welcome {session?.user?.name ?? "Guest"} 👋
          </h1>

          <p className="mt-4 text-gray-300 text-lg">
            Fast • Secure • Reliable — Experience seamless payments and account management.
          </p>

          {!session?.user && (
            <button
              onClick={() => signIn()}
              className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg shadow-lg transition-all"
            >
              Login to Get Started 🚀
            </button>
          )}
        </div>

        {/* FEATURES */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
          {[
            { title: "Instant Payments", icon: "⚡", desc: "Send and receive money instantly." },
            { title: "100% Secure", icon: "🔐", desc: "Your transactions are fully encrypted." },
            { title: "Rewards & Cashback", icon: "🎁", desc: "Earn rewards on every payment." },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 bg-white/10 backdrop-blur-xl shadow-xl rounded-2xl border border-white/20 hover:scale-[1.02] transition cursor-pointer"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="mt-2 text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="mt-20 py-6 text-center text-gray-400 text-sm border-t border-white/10">
        © {new Date().getFullYear()} Paytm Clone. Built with ❤️ using Next.js & Turborepo.
      </footer>
    </div>
  );
}
