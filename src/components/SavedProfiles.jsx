"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import httpClient from "../plugins/interceptor";
import { toast } from "react-toastify";

const SavedProfiles = () => {
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const getSavedProfiles = async () => {
    setLoading(true);
    const headers = {
      Authorization: `Bearer ${user.access}`,
    };
    try {
      const response = await httpClient.get("github/api/user_list", { headers });
      if (response.status === 200) {
        setProfileData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    // fetch saved profiles
    getSavedProfiles();
  }, []);

  const deleteProfile = async (profileId) => {
    const headers = {
      Authorization: `Bearer ${user.access}`,
    };
    try {
      const response = await httpClient.delete(`github/api/user/${profileId}`, {
        headers,
      });
      if (response.status === 204) {
        toast.success("Profile deleted successfully");
        setProfileData((prevData) => ({
          ...prevData,
          results: prevData.results.filter((profile) => profile.id !== profileId),
        }));
        await getSavedProfiles();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      {profileData && profileData.count > 0 && (
        <p className="text-xl font-bold mb-8 bg-carafe text-white text-center py-2">
          Here are your saved profiles {user ? user.username : ""}. You have saved{" "}
          {profileData.count} profiles.
        </p>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {profileData.results && profileData.results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {profileData.results.map((profile, index) => (
                <div
                  key={index}
                  className="p-4 border rounded shadow bg-secondary text-white"
                >
                  <h3 className="text-lg font-semibold">{profile.user_name}</h3>
                  {profile.user_image_url && (
                    <img
                      src={profile.user_image_url}
                      alt={`${profile.user_name}'s avatar`}
                      className="w-32 h-32 rounded-full mx-auto my-2"
                    />
                  )}
                  <button
                    onClick={() => window.open(profile.profile_url, "_blank")}
                    rel="noopener noreferrer"
                    className="hover:underline block bg-primary text-white px-4 py-2 rounded mt-2"
                  >
                    Profile Link
                  </button>
                  <button
                    onClick={() => deleteProfile(profile.id)}
                    className="mt-2 px-4 py-2 bg-danger text-white rounded hover:bg-red-900 transition-all duration-200"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No saved profiles found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SavedProfiles;
