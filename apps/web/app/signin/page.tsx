"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SigninPage() {
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = new FormData(e.currentTarget);

    const res = await signIn("credentials", {
      email: data.get("email"),
      password: data.get("password"),
      redirect: false, // IMPORTANT
      callbackUrl: "/",
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password");
      return;
    }

    if (res?.ok) {
      window.location.href = "/";
    }
  }

  function handleOAuth(provider: string) {
    setOauthLoading(provider);
    signIn(provider, { redirect: true, callbackUrl: "/" });
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#020617] overflow-hidden px-4">

      {/* BG Effects */}
      <div className="absolute w-[700px] h-[700px] bg-purple-600/30 rounded-full blur-[200px] -top-40 -left-40 animate-pulse"></div>
      <div className="absolute w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[200px] bottom-0 right-0 animate-pulse delay-1000"></div>
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(90deg,#fff_1px,transparent_1px),linear-gradient(#fff_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className="absolute inset-0 opacity-[0.14] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* LOGIN CARD */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-10">

        <h2 className="text-4xl font-extrabold text-center text-white mb-6">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-300 mb-6">Sign in to continue</p>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-4 text-red-300 bg-red-900/40 border border-red-600/40 p-3 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        {/* OAuth Buttons */}
        <div className="space-y-4">

          {/* Google */}
          <button
            onClick={() => handleOAuth("google")}
            disabled={!!oauthLoading}
            className={`
              w-full flex items-center justify-center gap-3 py-3
              rounded-lg bg-white text-black font-medium shadow-md
              hover:bg-gray-100 transition-all cursor-pointer
              ${oauthLoading ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            {oauthLoading === "google" ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                Signing in with Google...
              </div>
            ) : (
              <>
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" />
                Continue with Google
              </>
            )}
          </button>

          {/* GitHub */}
          <button
            onClick={() => handleOAuth("github")}
            disabled={!!oauthLoading}
            className={`
              w-full flex items-center justify-center gap-3 py-3
              rounded-lg bg-[#0a0a0a] text-white font-medium shadow-lg
              hover:bg-black transition-all cursor-pointer
              ${oauthLoading ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            {oauthLoading === "github" ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Signing in with GitHub...
              </div>
            ) : (
              <>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" className="w-5 h-5 invert" />
                Continue with GitHub
              </>
            )}
          </button>
        </div>

        {/* Divider */}
        <div className="my-8 flex items-center justify-center gap-4">
          <div className="h-px w-20 bg-gray-600"></div>
          <span className="text-gray-400 text-sm">OR</span>
          <div className="h-px w-20 bg-gray-600"></div>
        </div>

        {/* CREDENTIALS FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            name="email"
            type="email"
            placeholder="Email address"
            className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-purple-500 outline-none placeholder-gray-300"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-purple-500 outline-none placeholder-gray-300"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 
              text-white font-semibold shadow-xl transition-all cursor-pointer
              hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
