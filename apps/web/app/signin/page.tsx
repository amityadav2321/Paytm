"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SigninPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    const data = new FormData(e.currentTarget);

    await signIn("credentials", {
      email: data.get("email"),
      password: data.get("password"),
      redirect: true,
      callbackUrl: "/", // redirect after login
    });

    setLoading(false);
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#020617] overflow-hidden px-4">
      
      {/* Background blobs */}
      <div className="absolute w-[700px] h-[700px] bg-purple-600/30 rounded-full blur-[200px] -top-40 -left-40 animate-pulse"></div>
      <div className="absolute w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[200px] bottom-0 right-0 animate-pulse delay-1000"></div>

      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(90deg,#fff_1px,transparent_1px),linear-gradient(#fff_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Noise */}
      <div className="absolute inset-0 opacity-[0.14] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-10">

        <h2 className="text-4xl font-extrabold text-center text-white tracking-wide mb-8">
          Welcome Back 👋
        </h2>

        <p className="text-center text-gray-300 mb-6">Sign in to continue</p>

        {/* OAuth Buttons */}
        <div className="space-y-4">

          {/* Google Login */}
          <button
            onClick={() =>
              signIn("google", {
                redirect: true,
                callbackUrl: "/",
              })
            }
            className="w-full flex items-center justify-center gap-3 py-3 rounded-lg bg-white text-black font-medium hover:bg-gray-100 transition-all shadow-md"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          {/* GitHub Login */}
          <button
            onClick={() =>
              signIn("github", {
                redirect: true,
                callbackUrl: "/",
              })
            }
            className="w-full flex items-center justify-center gap-3 py-3 rounded-lg bg-[#0a0a0a] text-white font-medium hover:bg-black transition-all shadow-lg"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
              className="w-5 h-5 invert"
            />
            Continue with GitHub
          </button>
        </div>

        {/* Divider */}
        <div className="my-8 flex items-center justify-center gap-4">
          <div className="h-px w-20 bg-gray-600"></div>
          <span className="text-gray-400 text-sm">OR</span>
          <div className="h-px w-20 bg-gray-600"></div>
        </div>

        {/* Credentials Login */}
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
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:opacity-90 transition-all shadow-xl disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
