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
              <li>
                <button
                  onClick={logoutHandler}
                  className="text-white hover:text-gray-300"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link href="/login" className="text-white hover:text-gray-300">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="text-white hover:text-gray-300">
                    Register
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link href="/" className="text-white hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-white hover:text-gray-300">
                About
              </Link>
            </li>
            <li>
              <Link href="/github" className="text-white hover:text-gray-300">
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
