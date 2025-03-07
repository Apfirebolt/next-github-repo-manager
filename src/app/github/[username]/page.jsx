"use client";

import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Loader from "../../../components/Loader";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

const UserDetailPage = ({ match }) => {
  const params = useParams();
  const username = params.username;
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserDetails = async (username) => {
      setLoading(true);
      try {
        const [userResponse, reposResponse] = await Promise.all([
          axios.get(`https://api.github.com/users/${username}`),
          axios.get(
            `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
          ),
        ]);
        setUser(userResponse.data);
        setRepos(reposResponse.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getUserDetails(username);
  }, [username]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Fragment>
      <Header />
      <div className="user-container">
        <div className="user-info bg-white shadow-md rounded-lg p-6 text-center">
          <img
            src={user.avatar_url}
            alt="User Avatar"
            className="w-48 h-48 rounded-full mx-auto"
          />
          <h3 className="text-2xl font-semibold mt-4">{user.name}</h3>
          {user.email && (
            <p>
              Email Address: <span className="text-blue-500">{user.email}</span>
            </p>
          )}
          <p className="text-gray-600">{user.login}</p>
          <p className="text-gray-600 mt-2">{user.bio}</p>
          <div className="flex flex-col items-center mt-4 space-y-2 shadow-md rounded-lg p-4">
            <div className="flex space-x-4 bg-secondary-100 w-1/2 mx-auto justify-center text-secondary-300 px-2 py-3">
              <p className="font-semibold">
                Followers:{" "}
                <span className="text-primary-100 rounded-md px-2 py-1 bg-secondary-300">
                  {user.followers}
                </span>
              </p>
              <p className="font-semibold">
                Following:{" "}
                <span className="text-primary-100 rounded-md px-2 py-1 bg-secondary-300">
                  {user.following}
                </span>
              </p>
            </div>
            <div className="flex space-x-4 bg-secondary-100 w-1/2 mx-auto justify-center text-secondary-300 px-2 py-3">
              <p className="font-semibold">
                Public Repos:{" "}
                <span className="text-primary-100 rounded-md px-2 py-1 bg-secondary-300">
                  {user.public_repos}
                </span>
              </p>
              <p className="font-semibold">
                Public Gists:{" "}
                <span className="text-primary-100 rounded-md px-2 py-1 bg-secondary-300">
                  {user.public_gists}
                </span>
              </p>
            </div>
            <div className="flex space-x-4 bg-secondary-100 w-1/2 mx-auto justify-center text-secondary-300 px-2 py-3">
              <p className="font-semibold">
                Country:{" "}
                <span className="text-primary-100 rounded-md px-2 py-1 bg-secondary-300">
                  {user.location}
                </span>
              </p>
            </div>
          </div>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary-300 bg-primary-200 rounded-md shadow-md-primary-300 p-2 mt-4 inline-block"
          >
            View Profile
          </a>
        </div>
        <div className="container mx-auto my-4">
          <h3 className="text-2xl font-semibold text-center">
            Latest Repositories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
            {repos.map((repo) => (
              <div key={repo.id} className="bg-white shadow-md rounded-lg p-4">
                <h3 className="text-xl font-semibold">{repo.name}</h3>
                <p className="text-gray-600">{repo.description}</p>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-300 bg-primary-200 px-2 py-1 rounded-sm shadow-md mt-2 inline-block"
                >
                  View Repo
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default UserDetailPage;
