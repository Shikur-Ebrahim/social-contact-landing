"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import { Lock } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      
      const res = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create session");
      }

      toast.success("Login successful");
      router.push("/admin");
    } catch (error: any) {
      toast.error(error.message || "Failed to login");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-800">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Login</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Sign in to manage your landing page</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center py-3 px-4 rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/50 transition-all font-medium disabled:opacity-70"
          >
            {loading ? <LoadingSpinner size={20} className="text-white" /> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
