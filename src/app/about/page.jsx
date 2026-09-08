"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const technologies = [
  "Next.js App Router",
  "Tailwind CSS v4",
  "Redux Toolkit",
  "Headless UI",
  "React Icons",
  "React Toastify",
];

export default function About() {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return (
    <div className="flex min-h-screen flex-col bg-blood-dark text-parchment">
      <Header />

      <main className="flex flex-1 items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative mx-auto flex w-full max-w-2xl flex-col items-center text-center">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-12 h-44 w-44 rounded-full bg-wine/25 blur-3xl" />

          <span className="rounded-full border border-sage/30 bg-sage/10 px-3.5 py-1 text-xs font-semibold tracking-wider uppercase text-sage">
            Architecture & Stack
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-parchment sm:text-4xl md:text-5xl">
            Technologies Behind The App
          </h1>

          <p className="mt-4 max-w-lg text-sm leading-relaxed text-sage sm:text-base">
            Engineered with a modern frontend pipeline focused on high performance,
            scalable global state, and custom utility-first aesthetics.
          </p>

          <button
            type="button"
            onClick={openModal}
            className="mt-8 cursor-pointer rounded-lg bg-wine px-6 py-2.5 text-sm font-semibold text-parchment shadow-md transition hover:bg-wine/85 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-wine focus:ring-offset-2 focus:ring-offset-blood-dark active:scale-95"
          >
            View Tech Specs
          </button>
        </div>

        {/* Modal Dialog */}
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={closeModal}>
            {/* Backdrop Blur Layer */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-blood-dark/80 backdrop-blur-sm" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl border border-sage/25 bg-blood-dark/95 p-6 text-left shadow-2xl backdrop-blur-md transition-all sm:p-8">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-bold tracking-tight text-parchment"
                    >
                      Technology Stack
                    </Dialog.Title>

                    <div className="mt-3">
                      <p className="text-xs leading-relaxed text-sage">
                        This application is powered by standard-compliant modern tooling,
                        leveraging client-side routing, modular design tokens, and a reactive state machine.
                      </p>

                      {/* Tech Chips List */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-sage/20 bg-sage/10 px-2.5 py-1 text-xs font-medium text-parchment"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="cursor-pointer rounded-lg bg-wine px-4 py-2 text-xs font-semibold text-parchment shadow-sm transition hover:bg-wine/85 focus:outline-none focus:ring-2 focus:ring-wine focus:ring-offset-2 focus:ring-offset-blood-dark active:scale-95"
                      >
                        Close
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </main>

      <Footer />
    </div>
  );
}