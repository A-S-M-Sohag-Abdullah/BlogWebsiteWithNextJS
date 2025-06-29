"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState, AppDispatch } from "@/store";
import { logoutAdmin, validateAdminSession } from "@/store/slices/adminSlice";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn, loading } = useSelector(
    (state: RootState) => state.admin
  );

  const handleLogout = () => {
    dispatch(logoutAdmin());
  };

  useEffect(() => {
    dispatch(validateAdminSession());
  }, [dispatch]);

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push("/secret-admin-login");
    }
  }, [loading, isLoggedIn, router]);

  if (loading) return <div className="p-6 text-center">Checking auth...</div>;
  return (
    <>
      <div className="mb-3 flex justify-end">
        <Link
          href="/admin/createblog"
          className="text-white  me-5 px-3 py-2 rounded bg-blue-500"
        >
          Create Blog
        </Link>
        <Link
          href="/admin/categories/create"
          className="text-white  me-5 px-3 py-2 rounded bg-blue-500"
        >
          Create Category
        </Link>
        <Link
          href="/admin/blogs"
          className="text-white  me-5 px-3 py-2 rounded bg-blue-500"
        >
          Manage Blogs
        </Link>
        <button
          onClick={handleLogout}
          className="text-white  me-5 px-3 py-2 rounded bg-red-500"
        >
          Logout
        </button>
      </div>
      {children}{" "}
    </>
  );
}
