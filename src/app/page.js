"use client";

import Footer from "../components/Footer";
import Header from "../components/Header";
import { Fragment } from "react";

export default function Home() {

  return (
    <Fragment>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-center">
            Welcome to Github Management app!
          </h1>
          <p className="text-lg text-center">
            This app helps you manage your Github repositories
          </p>
        </div>
      </main>
      <Footer />
    </Fragment>
  );
}
