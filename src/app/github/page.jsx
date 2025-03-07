"use client";

import { useEffect, useState, Fragment, use } from "react";
import axios from "axios";
import Link from 'next/link';
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination";

export default function Games() {

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
    const params = {
      page: page,
      search: searchText
    };
    dispatch(getGames(params));
  }

  // debounce search here
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchUser(searchText, currentPage, itemsPerPage);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  return (
    <Fragment>
      <Header />
      <main className="container mx-auto px-4">
        <div className="my-5 bg-white p-4 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center my-2">
            Users
          </h1>
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Search Github Users..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="px-4 py-2 border rounded-lg w-full max-w-xl mx-auto"
            />
          </div>
        </div>
        
        {isLoading && <Loader />}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {apiData.items && apiData.items.map((user) => (
            <div key={user.id} className="bg-white p-4 my-2 rounded-lg shadow-lg">
              <img src={user.avatar_url} alt={user.login} className="w-16 h-16 rounded-full mx-auto" />
              <h2 className="text-xl font-bold text-center mt-2">{user.login}</h2>
              <div className="text-center mt-2">
                <Link href={`/github/${user.login}`}>
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
