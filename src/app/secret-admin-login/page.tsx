"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { loginAdmin, validateAdminSession } from "@/store/slices/adminSlice";
import { RootState, AppDispatch } from "@/store";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isLoggedIn, loading } = useSelector(
    (state: RootState) => state.admin
  );

  useEffect(() => {
    dispatch(validateAdminSession());
  }, [dispatch]);

  useEffect(() => {
    if (!loading && isLoggedIn) {
      router.push("/admin/blogs");
    }
  }, [loading, isLoggedIn, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(loginAdmin({ email, password }));
    if (loginAdmin.fulfilled.match(result)) {
      await dispatch(validateAdminSession());
      router.push("/admin/blogs");
    } else {
      alert("Invalid credentials");
    }
  };

  if (loading) return <div className="p-6 text-center">Checking auth...</div>;

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-sm mx-auto mt-20 bg-white shadow p-6 rounded"
    >
      <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
      <input
        type="email"
        placeholder="Admin email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
      />
      <input
        type="password"
        placeholder="Admin password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
        Login
      </button>
    </form>
  );
}
