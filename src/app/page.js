"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SavedRepo from "../components/SavedRepo";
import { Fragment } from "react";
import { resetMessage } from "../features/authSlice";

export default function Home() {

  const { user, message } = useSelector((state) => state.auth);
  const [isLogged, setIsLogged] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setIsLogged(true);
    }
  }
  , [user]);

  useEffect(() => {
    if (message && message === "User logged out successfully") {
      toast.success(message);
      dispatch(resetMessage());
      window.location.reload();
    }
  }, [message]);

  return (
    <Fragment>
      <Header />
      <main className="min-h-screen p-24">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-center">
            Welcome to Github Management app!
          </h1>
          <p className="text-lg text-center">
            This app helps you manage your Github repositories
          </p>
        </div>
        {isLogged && <SavedRepo />}
      </main>
      <Footer />
    </Fragment>
  );
}
