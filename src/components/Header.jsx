'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/navigation';
import { logout } from '../features/authSlice';

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [clientUser, setClientUser] = useState(null);

  const logoutHandler = () => {
    try {
      dispatch(logout());
      router.push("/login");
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    setClientUser(user);
  }, [user]);

  return (
    <header className="bg-primary">
      <div className="container mx-auto flex justify-between items-center p-4">
        <nav>
          <ul className="flex space-x-4">
            {clientUser ? (
              <li className="flex items-center space-x-2">
                <span className="bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-sm font-semibold">
                  Hello, {clientUser.username ? clientUser.username : ""}
                </span>
                <button
                  onClick={logoutHandler}
                  className="bg-red-500 text-white rounded-full px-3 py-1 text-sm font-semibold hover:bg-red-600"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link href="/login" className="bg-blue-500 text-white rounded-full px-3 py-1 text-sm font-semibold hover:bg-blue-600">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="bg-green-500 text-white rounded-full px-3 py-1 text-sm font-semibold hover:bg-green-600">
                    Register
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link href="/" className="bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-sm font-semibold hover:bg-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-sm font-semibold hover:bg-gray-300">
                About
              </Link>
            </li>
            <li>
              <Link href="/github" className="bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-sm font-semibold hover:bg-gray-300">
                Github Users
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
