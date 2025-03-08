"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import httpClient from "../plugins/interceptor";
import { toast } from "react-toastify";

const SavedRepo = () => {
  const [repoData, setRepoData] = useState({});
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const getSavedRepos = async () => {
    setLoading(true);
    const headers = {
      Authorization: `Bearer ${user.access}`,
    };
    try {
      const response = await httpClient.get("github/api/list", { headers });
      if (response.status === 200) {
        setRepoData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    // fetch saved repos
    getSavedRepos();
  }, []);

  const deleteRepo = async (repoId) => {
    const headers = {
      Authorization: `Bearer ${user.access}`,
    };
    try {
      const response = await httpClient.delete(`github/api/delete/${repoId}`, {
        headers,
      });
      if (response.status === 204) {
        toast.success("Repo deleted successfully");
        setRepoData((prevData) => ({
          ...prevData,
          results: prevData.results.filter((repo) => repo.id !== repoId),
        }));
        await getSavedRepos();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      {repoData && repoData.count > 0 && (
        <p className="text-xl font-bold mb-8 bg-carafe text-white text-center py-2">
          Here are your saved repos {user ? user.username : ""}. You have saved{" "}
          {repoData.count} repos.
        </p>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {repoData.results && repoData.results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {repoData.results.map((repo, index) => (
                <div
                  key={index}
                  className="p-4 border rounded shadow bg-secondary text-white"
                >
                  <h3 className="text-lg font-semibold">{repo.repo_name}</h3>
                  <p>Repo Owned by: {repo.repo_creator}</p>
                  <p>Language: {repo.repo_language}</p>
                  <p>Stars: {repo.repo_stars}</p>
                  <button
                    onClick={() => window.open(repo.repo_url, "_blank")}
                    rel="noopener noreferrer"
                    className="hover:underline block bg-primary text-white px-4 py-2 rounded mt-2"
                  >
                    Repo Link
                  </button>
                  <button
                    onClick={() => deleteRepo(repo.id)}
                    className="mt-2 px-4 py-2 bg-danger text-white rounded hover:bg-red-900 transition-all duration-200"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No saved repositories found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SavedRepo;
