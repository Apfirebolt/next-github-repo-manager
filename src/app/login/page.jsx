"use client";

import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { login, resetMessage } from "../../features/authSlice";
import Image from "next/image";
import githubLogo from "../../../public/github.png";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const { user, message } = useSelector((state) => state.auth);

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email field is required";
    if (!password) {
      newErrors.password = "Password is a required field";
    } else if (password.length < 8) {
      newErrors.password = "Password is too short";
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
    await dispatch(login({ email, password }));
    dispatch(resetMessage());
  };

  useEffect(() => {
    // show message
    if (message) {
      toast.success(message);
      dispatch(resetMessage());
    }
  }, [message]);

  return (
    <Fragment>
      <Header />
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={onSubmit}>
              <Image
                className="mx-auto h-32 w-auto"
                src={githubLogo}
                alt="GitHub Logo"
                width={48}
                height={48}
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to your account
              </h2>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <p className="my-2 text-red-800">{errors.email}</p>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <p className="my-2 text-red-800">{errors.password}</p>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-carafe focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  Sign in
                </button>
              </div>

              <div>
                <p className="mt-2 text-center text-sm text-gray-600">
                  Don't have an account?{" "}
                  <a
                    href="/register"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default LoginPage;
