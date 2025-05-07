import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";
import axios from "axios";
import VDotModal from "../components/VDotModal";

const API_URL = "https://web-back-4n3m.onrender.com";

const Profile = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVDotModalOpen, setIsVDotModalOpen] = useState(false);

  // Update vdot modal
  const handleVDotUpdate = (updatedUser) => {
    setUserData(updatedUser);
    setIsVDotModalOpen(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // Get token from localStorage
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No authentication token found");
        }

        // Use the user ID from the auth store to fetch the full user data
        const response = await axios.get(`${API_URL}/api/v1/user/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch user data"
        );
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated && user?._id) {
      // First try with the user data we already have
      setUserData(user);
      // Then fetch fresh data from the server
      fetchUserData();
    }
  }, [isAuthenticated, user]);

  // Rest of the component remains the same...
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto my-10 rounded-3xl p-8 bg-zinc-700/30 backdrop-blur-lg border border-white/10 shadow-2xl">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto my-10 rounded-3xl p-8 bg-zinc-700/30 backdrop-blur-lg border border-white/10 shadow-2xl">
        <div className="text-red-500 text-center py-10">Error: {error}</div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="max-w-4xl mx-auto my-10 rounded-3xl p-8 bg-zinc-700/30 backdrop-blur-lg border border-white/10 shadow-2xl">
        <div className="text-center py-10">
          No user data available. Please sign in.
        </div>
      </div>
    );
  }

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-4xl mx-auto my-10 rounded-3xl p-8 bg-zinc-700/30 backdrop-blur-lg border border-white/10 shadow-2xl">
      {/* User Profile */}
      <div className="flex flex-col md:flex-row items-center md:items-center gap-6 mb-8">
        <div className="relative justify-center items-center">
          <img
            src={
              userData?.avatar ||
              "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"
            }
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
            alt="Profile"
          />
          <button className="text-sm text-neutral-100 hover:text-blue-100 mt-2 block px-7">
            Edit Photo
          </button>
        </div>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-extrabold capitalize">
                {userData.username}
              </h1>
              <div className="text-gray-100 mt-1">
                <p className="capitalize">Username: {userData.username}</p>
                <p>Email: {userData.email}</p>
              </div>
              <Link to={"/editProfile"}>
                <button className="text-blue-100 hover:text-blue-50 cursor-pointer text-sm mt-1 border rounded-2xl px-5 py-1 bg-blue-100/30 backdrop-blur-lg border-neutral-50/5 shadow-2xl">
                  Edit Profile
                </button>
              </Link>
            </div>

            <div className="mt-4 md:mt-0">
              <div className="border-4 border-gray-300 bg-sky-400/10 backdrop-blur-2xl rounded-full w-32 h-32 flex items-center justify-center relative">
                <div className="text-center">
                  <div className="text-md text-sky-400 font-extrabold">
                    VDOT
                  </div>
                  <div className="text-4xl font-bold">
                    {userData.vDot?.value || "--"}
                  </div>
                </div>
                <button
                  onClick={() => setIsVDotModalOpen(true)}
                  className="absolute -bottom-2 -right-2 bg-sky-600 hover:bg-sky-700 text-white rounded-full p-2 cursor-pointer"
                  title="Edit VDOT"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Bests */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4 w-full bg-gray-100/10 rounded-lg p-2">
          <div className="flex items-center">
            <span className="mr-2">🏆</span>
            <h2 className="text-xl font-semibold">Personal Bests</h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-gray-200">
            <thead>
              <tr>
                <th className="py-3 text-left text-lg font-medium text-gray-100 px-5 uppercase tracking-wider">
                  Distance
                </th>
                <th className="py-3 text-center text-lg font-medium text-gray-100 px-5 uppercase tracking-wider">
                  Time
                </th>
                <th className="py-3 text-center text-lg font-medium text-gray-100 px-5 uppercase tracking-wider">
                  Date
                </th>
                <th className="py-3 text-center text-lg font-medium text-gray-100 px-5 uppercase tracking-wider">
                  Location
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {["fiveK", "tenK", "halfMarathon", "marathon"].map(
                (distance) =>
                  userData.personalBests?.[distance]?.time && (
                    <tr key={distance}>
                      <td className="py-3 text-md  text-sky-400 hover:text-sky-500 text-start pl-5 capitalize font-extrabold">
                        {distance.replace(/([A-Z])/g, " $1").trim()}
                      </td>
                      <td className="py-3 text-md text-center text-neutral-100 font-bold">
                        {userData.personalBests[distance].time}
                      </td>
                      <td className="py-3 text-md text-center text-neutral-100 font-bold">
                        {formatDate(userData.personalBests[distance].date)}
                      </td>
                      <td className="py-3 text-md text-center text-neutral-100 font-bold">
                        {userData.personalBests[distance].location || "N/A"}
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upcoming Races */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4 w-full bg-gray-100/10 rounded-lg p-2">
          <div className="flex items-center">
            <span className="mr-2">👟</span>
            <h2 className="text-xl font-semibold">Upcoming Races</h2>
          </div>
          <Link to={"/addUpcomingRace"}>
            <button className="text-blue-500 p-1 rounded-full hover:bg-blue-50/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </Link>
        </div>
        {userData.upcomingRaces?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y-2 divide-gray-200">
              <thead>
                <tr>
                  <th className="py-3 text-left text-lg font-medium text-gray-100 px-5 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="py-3 text-center text-lg font-medium text-gray-100 px-5 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="py-3 text-center text-lg font-medium text-gray-100 px-5 uppercase tracking-wider">
                    Expected Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {userData.upcomingRaces.map((race, index) => (
                  <tr key={race._id || index}>
                    {" "}
                    {/* Use race._id if available, otherwise fallback to index */}
                    <td className="py-3 text-md text-sky-400 hover:text-sky-500 text-start pl-5 capitalize font-extrabold">
                      {race.name}
                    </td>
                    <td className="py-3 text-md text-center text-neutral-100 font-bold">
                      {formatDate(race.date)}
                    </td>
                    <td className="py-3 text-center text-md text-neutral-100 font-bold">
                      {race.projectedTime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10 text-gray-400">
            <p>No Recent Races 😞</p>
          </div>
        )}
      </div>

      {/* Recent Races */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4 w-full bg-gray-100/10 rounded-lg p-2">
          <div className="flex items-center">
            <span className="mr-2">⏱️</span>
            <h2 className="text-xl font-semibold">Recent Races</h2>
          </div>
          <Link to={"/addRecentRace"}>
            <button className="text-blue-500 p-1 rounded-full hover:bg-blue-50/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </Link>
        </div>
        {userData.recentRaces?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y-2 divide-gray-200">
              <thead>
                <tr>
                  <th className="py-3 text-left text-lg font-medium text-gray-100 px-5 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="py-3 text-center text-lg font-medium text-gray-100 px-5 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="py-3 text-center text-lg font-medium text-gray-100 px-5 uppercase tracking-wider">
                    Distance (km)
                  </th>
                  <th className="py-3 text-center text-lg font-medium text-gray-100 px-5 uppercase tracking-wider">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {userData.recentRaces.map((race, index) => (
                  <tr key={race._id || index}>
                    {" "}
                    {/* Use race._id if available, otherwise fallback to index */}
                    <td className="py-3 text-md font-extrabold text-sky-400 hover:text-sky-500 text-start pl-5 capitalize">
                      {race.name}
                    </td>
                    <td className="py-3 text-center text-md text-neutral-100 font-bold">
                      {formatDate(race.date)}
                    </td>
                    <td className="py-3 text-center text-md text-neutral-100 font-bold">
                      {race.distance}
                    </td>
                    <td className="py-3 text-center text-md text-neutral-100 font-bold">
                      {race.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10 text-gray-400">
            <p>No Recent Races 😞</p>
          </div>
        )}
      </div>

      {/* Training Paces */}
      {userData.vDot?.trainingPaces && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <span className="mr-2">🏃</span>
              <h2 className="text-xl font-semibold">Training Paces</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(userData.vDot.trainingPaces).map(
              ([type, pace]) =>
                pace && (
                  <div key={type} className="bg-gray-800/50 p-4 rounded-lg">
                    <h3 className="text-lg font-bold text-sky-400 capitalize">
                      {type.replace(/([A-Z])/g, " $1").trim()}
                    </h3>
                    <p className="text-xl font-bold text-neutral-100">{pace}</p>
                  </div>
                )
            )}
          </div>
        </div>
      )}
      <VDotModal
        isOpen={isVDotModalOpen}
        onClose={() => setIsVDotModalOpen(false)}
        user={userData}
        onUpdate={handleVDotUpdate}
      />
    </div>
  );
};

export default Profile;
