"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { FaSearch, FaChevronLeft, FaChevronRight, FaGithub } from "react-icons/fa";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Loader from "../../components/Loader";

export default function Github() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("next");
  const [isLoading, setIsLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(18);
  const [apiData, setApiData] = useState({ total_count: 0, items: [] });
  const [error, setError] = useState(null);

  // GitHub Search API limits accessible search results to the first 1,000 items
  const maxSearchLimit = 1000;
  const effectiveTotal = Math.min(apiData.total_count || 0, maxSearchLimit);
  const totalPages = Math.max(1, Math.ceil(effectiveTotal / itemsPerPage));

  useEffect(() => {
    if (!searchText.trim()) {
      setApiData({ total_count: 0, items: [] });
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    setIsLoading(true);
    setError(null);

    const delayDebounceFn = setTimeout(async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/search/users?q=${encodeURIComponent(
            searchText.trim()
          )}&per_page=${itemsPerPage}&page=${currentPage}`,
          { signal: controller.signal }
        );
        setApiData(response.data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error(err);
          setError("Failed to fetch users. Rate limit may have been reached.");
        }
      } finally {
        setIsLoading(false);
      }
    }, 400);

    return () => {
      clearTimeout(delayDebounceFn);
      controller.abort();
    };
  }, [searchText, currentPage, itemsPerPage]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  };

  const handlePerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="flex min-h-screen flex-col bg-blood-dark text-parchment">
      <Header />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {/* Search & Filter Header Panel */}
        <section className="rounded-2xl border border-sage/20 bg-blood-dark/60 p-6 shadow-xl backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Title & Stats */}
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-parchment sm:text-3xl">
                GitHub Explorers
              </h1>
              <p className="mt-1 text-xs text-sage">
                {apiData.total_count > 0
                  ? `Discovered ${apiData.total_count.toLocaleString()} accounts`
                  : "Search developers globally"}
              </p>
            </div>

            {/* Controls Row */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Search Bar */}
              <div className="relative flex-1 sm:w-80">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                  <FaSearch className="h-3.5 w-3.5 text-sage" />
                </div>
                <input
                  type="text"
                  placeholder="Search usernames..."
                  value={searchText}
                  onChange={handleSearchChange}
                  className="w-full rounded-lg border border-sage/30 bg-blood-dark/70 py-2 pl-10 pr-4 text-sm text-parchment placeholder-sage/50 transition focus:border-wine focus:outline-none focus:ring-1 focus:ring-wine"
                />
              </div>

              {/* Items Per Page Select */}
              <select
                value={itemsPerPage}
                onChange={handlePerPageChange}
                className="rounded-lg border border-sage/30 bg-blood-dark/70 px-3 py-2 text-xs font-medium text-parchment transition focus:border-wine focus:outline-none focus:ring-1 focus:ring-wine"
              >
                <option value={12} className="bg-blood-dark text-parchment">12 / page</option>
                <option value={18} className="bg-blood-dark text-parchment">18 / page</option>
                <option value={24} className="bg-blood-dark text-parchment">24 / page</option>
                <option value={36} className="bg-blood-dark text-parchment">36 / page</option>
              </select>

              {/* Pagination Controls */}
              <div className="flex items-center justify-between gap-2 sm:justify-start">
                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage <= 1 || isLoading}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-sage/30 bg-blood-dark/50 text-parchment transition hover:bg-wine hover:border-wine disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Previous page"
                >
                  <FaChevronLeft className="h-3 w-3" />
                </button>

                <span className="px-2 text-xs font-medium tracking-wide text-sage">
                  <strong className="text-parchment">{currentPage}</strong> / {totalPages}
                </span>

                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage >= totalPages || isLoading}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-sage/30 bg-blood-dark/50 text-parchment transition hover:bg-wine hover:border-wine disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Next page"
                >
                  <FaChevronRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Error Alert */}
        {error && (
          <div className="mt-6 rounded-lg border border-wine bg-wine/10 p-4 text-center text-xs font-medium text-parchment">
            {error}
          </div>
        )}

        {/* Results / Loading State */}
        {isLoading ? (
          <div className="py-24">
            <Loader fullScreen={false} label="Searching Github users..." />
          </div>
        ) : apiData.items && apiData.items.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {apiData.items.map((user) => (
              <div
                key={user.id}
                className="group relative flex flex-col items-center rounded-xl border border-sage/20 bg-blood-dark/40 p-6 text-center shadow-md backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-sage/40 hover:bg-blood-dark/70 hover:shadow-xl"
              >
                {/* User Avatar with Ring */}
                <div className="relative h-20 w-20 overflow-hidden rounded-full ring-2 ring-sage/30 transition-transform duration-200 group-hover:scale-105 group-hover:ring-wine">
                  <img
                    src={user.avatar_url}
                    alt={`${user.login}'s avatar`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Username */}
                <h2 className="mt-4 truncate text-sm font-semibold tracking-wide text-parchment">
                  {user.login}
                </h2>

                <p className="mt-0.5 text-[11px] text-sage">
                  ID: {user.id}
                </p>

                {/* Action Link */}
                <Link
                  href={`/github/${user.login}`}
                  className="mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-wine bg-wine/80 px-3 py-2 text-xs font-semibold text-parchment shadow-sm transition hover:bg-wine active:scale-95"
                >
                  <FaGithub className="h-3.5 w-3.5" />
                  View Profile
                </Link>
              </div>
            ))}
          </div>
        ) : (
          !isLoading && (
            <div className="mt-16 flex flex-col items-center justify-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-sage/30 bg-blood-dark/60 text-sage">
                <FaSearch className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-parchment">
                No users found
              </h3>
              <p className="mt-1 text-xs text-sage">
                Try querying a different developer handle or keyword.
              </p>
            </div>
          )
        )}
      </main>

      <Footer />
    </div>
  );
}