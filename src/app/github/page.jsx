"use client";

import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import Link from 'next/link';
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Loader from "../../components/Loader";

export default function Github() {

  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("next");
  const [isLoading, setIsLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [apiData, setApiData] = useState({});

  const searchUser = async (term, current_page, per_page) => {
    setIsLoading(true);
    await axios
      .get(
        `https://api.github.com/search/users?q=${term}&per_page=${per_page}&page=${current_page}`
      )
      .then((userResponse) => {
        if (userResponse) {
          setIsLoading(false);
          setApiData(userResponse.data);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log('Page now is ', page)
  }

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  }

  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  }

  // debounce search here
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchUser(searchText, currentPage, itemsPerPage);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText, itemsPerPage, currentPage]);

  return (
    <Fragment>
      <Header />
      <main className="container mx-auto px-4">
        <div className="my-5 bg-white p-4 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center my-2">
            Users
          </h1>
          <div className="flex justify-center items-center">
            <input
              type="text"
              placeholder="Search Github Users..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="px-4 py-2 border rounded-lg w-full max-w-xl mx-auto"
            />
            <button
              onClick={() => goToNextPage()}
              className="bg-secondary text-white px-4 py-2 rounded-lg ml-4"
              disabled={apiData.total_count < 1}
            >
              Next Page
            </button>
            <p className="mx-2">
              Page: {currentPage} of {Math.ceil(apiData.total_count / itemsPerPage)}
            </p>
            <button
              onClick={() => goToPrevPage()}
              className="bg-secondary text-white px-4 py-2 rounded-lg ml-4"
              disabled={currentPage === 1}
            >
              Prev Page
            </button>
            
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="ml-4 px-4 py-2 border w-48 rounded-lg"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
        
        {isLoading && <Loader />}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {apiData.items && apiData.items.map((user) => (
            <div key={user.id} className="bg-white p-4 my-2 rounded-lg shadow-lg">
              <img src={user.avatar_url} alt={user.login} className="w-32 h-24 rounded-full mx-auto" />
              <h2 className="text-xl font-bold text-center my-3">{user.login}</h2>
              <div className="text-center mt-2">
                <Link href={`/github/${user.login}`} className="bg-secondary text-white px-4 py-2 rounded-lg">
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </Fragment>
  );
}
