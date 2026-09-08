"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaEnvelope, FaLock, FaUserAlt } from "react-icons/fa";
import { toast } from "react-toastify";

import { register, resetMessage } from "../../features/authSlice";
import githubLogo from "../../../public/github.png";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const router = useRouter();
  const { message } = useSelector((state) => state.auth);

  const validate = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = "Username field is required";
    if (!email.trim()) {
      newErrors.email = "Email field is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is a required field";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    return newErrors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    await dispatch(register({ username, email, password }));
  };

  useEffect(() => {
    if (message) {
      if (message === "User registered successfully, please login") {
        toast.success(message);
        dispatch(resetMessage());
        router.push("/login");
      } else {
        toast.error(message);
        dispatch(resetMessage());
      }
    }
  }, [message, dispatch, router]);

  return (
    <div className="flex min-h-screen flex-col bg-blood-dark text-parchment">
      <Header />

      <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="rounded-2xl border border-sage/20 bg-blood-dark/60 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
            {/* Header / Brand Icon */}
            <div className="text-center">
              <div className="inline-flex rounded-full bg-blood-dark p-2 ring-1 ring-sage/30">
                <Image
                  className="h-14 w-14 object-contain brightness-90"
                  src={githubLogo}
                  alt="GitHub Logo"
                  width={56}
                  height={56}
                  priority
                />
              </div>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-parchment">
                Create your account
              </h2>
              <p className="mt-1 text-xs text-sage">
                Get started with your GitHub Manager portal
              </p>
            </div>

            {/* Form */}
            <form className="mt-8 space-y-5" onSubmit={onSubmit} noValidate>
              {/* Username Field */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-xs font-medium uppercase tracking-wider text-parchment/90"
                >
                  Username
                </label>
                <div className="relative mt-1.5 rounded-lg shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <FaUserAlt className="h-3.5 w-3.5 text-sage" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="johndoe"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`block w-full rounded-lg border bg-blood-dark/50 py-2.5 pl-10 pr-4 text-sm text-parchment placeholder-sage/50 transition focus:outline-none ${
                      errors.username
                        ? "border-wine focus:ring-1 focus:ring-wine"
                        : "border-sage/30 focus:border-wine focus:ring-1 focus:ring-wine"
                    }`}
                  />
                </div>
                {errors.username && (
                  <p className="mt-1.5 text-xs font-medium text-wine">
                    {errors.username}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium uppercase tracking-wider text-parchment/90"
                >
                  Email Address
                </label>
                <div className="relative mt-1.5 rounded-lg shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <FaEnvelope className="h-3.5 w-3.5 text-sage" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`block w-full rounded-lg border bg-blood-dark/50 py-2.5 pl-10 pr-4 text-sm text-parchment placeholder-sage/50 transition focus:outline-none ${
                      errors.email
                        ? "border-wine focus:ring-1 focus:ring-wine"
                        : "border-sage/30 focus:border-wine focus:ring-1 focus:ring-wine"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs font-medium text-wine">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-medium uppercase tracking-wider text-parchment/90"
                >
                  Password
                </label>
                <div className="relative mt-1.5 rounded-lg shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <FaLock className="h-3.5 w-3.5 text-sage" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`block w-full rounded-lg border bg-blood-dark/50 py-2.5 pl-10 pr-4 text-sm text-parchment placeholder-sage/50 transition focus:outline-none ${
                      errors.password
                        ? "border-wine focus:ring-1 focus:ring-wine"
                        : "border-sage/30 focus:border-wine focus:ring-1 focus:ring-wine"
                    }`}
                  />
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs font-medium text-wine">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full cursor-pointer rounded-lg bg-wine px-4 py-2.5 text-sm font-semibold text-parchment shadow-md transition hover:bg-wine/85 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-wine focus:ring-offset-2 focus:ring-offset-blood-dark active:scale-[0.99]"
              >
                Create Account
              </button>

              {/* Redirect to Sign In */}
              <p className="text-center text-xs text-sage">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-parchment underline decoration-wine underline-offset-4 transition hover:text-parchment/80"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RegisterPage;