"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import httpClient from "../../../plugins/interceptor";
import axios from "axios";
import { useParams } from "next/navigation";
import {
  FaGithub,
  FaBookmark,
  FaMapMarkerAlt,
  FaEnvelope,
  FaBook,
  FaUsers,
  FaUserFriends,
  FaCodeBranch,
  FaStar,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

const UserDetailPage = () => {
  const params = useParams();
  const username = params?.username;
  const [githubUser, setGithubUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingRepoId, setSavingRepoId] = useState(null);

  const { user } = useSelector((state) => state.auth);

  const saveProfile = async (profile) => {
    if (!user?.access) {
      toast.error("Please login to save this profile");
      return;
    }

    setSavingProfile(true);
    const data = {
      owner: user.id,
      user_name: profile.login,
      user_url: profile.html_url,
      user_image_url: profile.avatar_url,
    };
    const headers = {
      Authorization: `Bearer ${user.access}`,
    };

    try {
      const response = await httpClient.post("github/api/user", data, { headers });
      if (response.status === 201) {
        toast.success("Profile saved successfully");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired, please login again");
      } else if (error.response?.status === 400) {
        toast.error("Profile already saved");
      } else {
        toast.error("Failed to save profile. Try again later.");
      }
      console.error(error);
    } finally {
      setSavingProfile(false);
    }
  };

  const saveRepo = async (repo) => {
    if (!user?.access) {
      toast.error("Please login to save this repository");
      return;
    }

    setSavingRepoId(repo.id);
    const data = {
      repo_creator: repo.owner.login,
      repo_language: repo.language || "Not Specified",
      repo_name: repo.name,
      repo_description: repo.description || "Not Specified",
      repo_url: repo.html_url,
      repo_stars: repo.stargazers_count || 0,
      repo_score: repo.score || 0,
      repo_watchers: repo.watchers_count || 0,
      repo_created_on: repo.created_at,
    };
    const headers = {
      Authorization: `Bearer ${user.access}`,
    };

    try {
      const response = await httpClient.post("github/api/create", data, { headers });
      if (response.status === 201) {
        toast.success("Repository saved successfully");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired, please login again");
      } else if (error.response?.status === 400) {
        toast.error("Repository already saved");
      } else {
        toast.error("Failed to save repository. Try again later.");
      }
      console.error(error);
    } finally {
      setSavingRepoId(null);
    }
  };

  useEffect(() => {
    if (!username) return;

    const getUserDetails = async () => {
      setLoading(true);
      try {
        const [userResponse, reposResponse] = await Promise.all([
          axios.get(`https://api.github.com/users/${username}`),
          axios.get(
            `https://api.github.com/users/${username}/repos?per_page=6&sort=updated`
          ),
        ]);
        setGithubUser(userResponse.data);
        setRepos(reposResponse.data);
      } catch (error) {
        console.error(error);
        toast.error("Could not fetch user profile details.");
      } finally {
        setLoading(false);
      }
    };

    getUserDetails();
  }, [username]);

  if (loading) {
    return <Loader label="Fetching developer profile..." />;
  }

  if (!githubUser) {
    return (
      <div className="flex min-h-screen flex-col bg-blood-dark text-parchment">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <p className="text-sage text-sm">Developer not found.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-blood-dark text-parchment">
      <Header />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {/* Profile Card Hero */}
        <section className="relative overflow-hidden rounded-2xl border border-sage/20 bg-blood-dark/60 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-wine/15 blur-3xl pointer-events-none" />

          <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-8">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="h-36 w-36 overflow-hidden rounded-full ring-4 ring-sage/30 shadow-xl">
                <img
                  src={githubUser.avatar_url}
                  alt={githubUser.login}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Profile Information */}
            <div className="flex-1 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-parchment sm:text-3xl">
                    {githubUser.name || githubUser.login}
                  </h1>
                  <p className="text-sm font-medium text-sage">@{githubUser.login}</p>
                </div>

                {/* Main Profile CTA Buttons */}
                <div className="flex flex-wrap gap-2.5 justify-center sm:justify-end">
                  <a
                    href={githubUser.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-sage/30 bg-blood-dark/80 px-4 py-2 text-xs font-semibold text-parchment shadow-sm transition hover:border-parchment hover:bg-blood-dark active:scale-95"
                  >
                    <FaGithub className="h-3.5 w-3.5" />
                    GitHub Profile
                    <FaExternalLinkAlt className="h-2.5 w-2.5 opacity-70" />
                  </a>
                  <button
                    onClick={() => saveProfile(githubUser)}
                    disabled={savingProfile}
                    className="inline-flex items-center gap-2 rounded-lg bg-wine px-4 py-2 text-xs font-semibold text-parchment shadow-sm transition hover:bg-wine/85 disabled:opacity-50 active:scale-95"
                  >
                    <FaBookmark className="h-3 w-3" />
                    {savingProfile ? "Saving..." : "Save Profile"}
                  </button>
                </div>
              </div>

              {githubUser.bio && (
                <p className="max-w-2xl text-xs sm:text-sm leading-relaxed text-parchment/80 pt-1">
                  {githubUser.bio}
                </p>
              )}

              {/* Meta details */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 text-xs text-sage">
                {githubUser.location && (
                  <span className="flex items-center gap-1.5">
                    <FaMapMarkerAlt className="text-wine" />
                    {githubUser.location}
                  </span>
                )}
                {githubUser.email && (
                  <span className="flex items-center gap-1.5">
                    <FaEnvelope className="text-wine" />
                    {githubUser.email}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 border-t border-sage/20 pt-6">
            <div className="rounded-xl border border-sage/15 bg-blood-dark/50 p-3.5 text-center">
              <span className="flex items-center justify-center gap-1.5 text-xs text-sage">
                <FaUsers className="h-3.5 w-3.5" /> Followers
              </span>
              <p className="mt-1 text-lg font-bold text-parchment">
                {githubUser.followers?.toLocaleString()}
              </p>
            </div>
            <div className="rounded-xl border border-sage/15 bg-blood-dark/50 p-3.5 text-center">
              <span className="flex items-center justify-center gap-1.5 text-xs text-sage">
                <FaUserFriends className="h-3.5 w-3.5" /> Following
              </span>
              <p className="mt-1 text-lg font-bold text-parchment">
                {githubUser.following?.toLocaleString()}
              </p>
            </div>
            <div className="rounded-xl border border-sage/15 bg-blood-dark/50 p-3.5 text-center">
              <span className="flex items-center justify-center gap-1.5 text-xs text-sage">
                <FaBook className="h-3.5 w-3.5" /> Public Repos
              </span>
              <p className="mt-1 text-lg font-bold text-parchment">
                {githubUser.public_repos?.toLocaleString()}
              </p>
            </div>
            <div className="rounded-xl border border-sage/15 bg-blood-dark/50 p-3.5 text-center">
              <span className="flex items-center justify-center gap-1.5 text-xs text-sage">
                <FaCodeBranch className="h-3.5 w-3.5" /> Public Gists
              </span>
              <p className="mt-1 text-lg font-bold text-parchment">
                {githubUser.public_gists?.toLocaleString()}
              </p>
            </div>
          </div>
        </section>

        {/* Latest Repositories Section */}
        <section className="mt-10">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-parchment">
                Recent Repositories
              </h2>
              <p className="text-xs text-sage mt-0.5">
                Displaying most recently updated repositories
              </p>
            </div>
          </div>

          {repos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {repos.map((repo) => (
                <div
                  key={repo.id}
                  className="flex flex-col justify-between rounded-xl border border-sage/20 bg-blood-dark/50 p-5 shadow-md backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-sage/40 hover:bg-blood-dark/70"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-bold text-parchment truncate">
                        {repo.name}
                      </h3>
                      {repo.language && (
                        <span className="shrink-0 rounded-full border border-sage/30 bg-sage/10 px-2 py-0.5 text-[10px] font-medium text-sage">
                          {repo.language}
                        </span>
                      )}
                    </div>

                    <p className="mt-2.5 text-xs leading-relaxed text-sage line-clamp-2">
                      {repo.description || "No description provided."}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-sage/10 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-sage">
                      <span className="flex items-center gap-1">
                        <FaStar className="h-3 w-3 text-wine" />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaCodeBranch className="h-3 w-3 text-sage/70" />
                        {repo.forks_count || 0}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md border border-sage/30 p-1.5 text-xs text-parchment transition hover:border-parchment hover:bg-blood-dark active:scale-95"
                        title="View repository on GitHub"
                      >
                        <FaExternalLinkAlt className="h-3 w-3" />
                      </a>
                      <button
                        onClick={() => saveRepo(repo)}
                        disabled={savingRepoId === repo.id}
                        className="inline-flex items-center gap-1 rounded-md bg-wine px-2.5 py-1.5 text-xs font-medium text-parchment transition hover:bg-wine/85 disabled:opacity-50 active:scale-95"
                      >
                        <FaBookmark className="h-2.5 w-2.5" />
                        {savingRepoId === repo.id ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-sage/20 bg-blood-dark/40 p-8 text-center text-xs text-sage">
              No public repositories found for this account.
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default UserDetailPage;