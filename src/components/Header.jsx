'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "../features/authSlice";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [clientUser, setClientUser] = useState(null);

  useEffect(() => {
    setClientUser(user);
  }, [user]);

  const logoutHandler = () => {
    try {
      dispatch(logout());
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blood-dark/30 bg-blood-dark/95 backdrop-blur-md text-parchment transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <Link 
          href="/" 
          className="text-lg font-bold tracking-wider text-parchment transition hover:text-parchment/80 uppercase"
        >
          Portal
        </Link>

        {/* Central Navigation */}
        <nav className="flex items-center space-x-1 sm:space-x-2">
          <Link
            href="/"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-parchment/80 transition hover:bg-wine/30 hover:text-parchment"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-parchment/80 transition hover:bg-wine/30 hover:text-parchment"
          >
            About
          </Link>
          <Link
            href="/github"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-parchment/80 transition hover:bg-wine/30 hover:text-parchment"
          >
            Github Users
          </Link>
        </nav>

        {/* Auth Actions */}
        <div className="flex items-center space-x-3">
          {clientUser ? (
            <div className="flex items-center space-x-3">
              <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-sage/40 bg-sage/10 px-3 py-1 text-xs font-medium text-parchment">
                <span className="h-1.5 w-1.5 rounded-full bg-sage"></span>
                {clientUser.username ?? "User"}
              </span>
              <button
                onClick={logoutHandler}
                className="cursor-pointer rounded-md border border-wine bg-wine/80 px-3.5 py-1.5 text-xs font-semibold text-parchment shadow-sm transition hover:bg-wine hover:border-wine active:scale-95"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                href="/login"
                className="rounded-md px-3 py-1.5 text-xs font-semibold text-parchment/90 transition hover:bg-sage/20 hover:text-parchment"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-wine px-3.5 py-1.5 text-xs font-semibold text-parchment shadow-sm transition hover:bg-wine/85 hover:shadow active:scale-95"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;