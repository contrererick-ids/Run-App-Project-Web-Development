import { useState, useEffect } from "react";
import axios from "axios";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AddRecentRace = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const API_URL = "https://web-back-4n3m.onrender.com";
  const DISTANCE_OPTIONS = [5, 10, 15, 16, 21.0975, 42.195];
  // Check if user exists
  if (!user) {
    console.error("User not found");
    return null;
  }

  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found");
    return null;
  }

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    distance: "",
    time: "",
    timeInSeconds: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (success) {
      navigate("/profile");
    }
  }, [navigate, success]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, timeInSeconds: formData.time.split(":").reduce((acc, time) => (60 * acc) + +time),
      [name]: name === "distance" ? Number(value) : value,
    });
  };

  console.log("Request URL:", `${API_URL}/api/v1/user/recent/${user._id}`);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log("Form Data:", formData);
      const res = await axios.put(
        `${API_URL}/api/v1/user/recent/${user._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        setSuccess(true);
        setMessage("Race added successfully");
        setFormData({
          name: "",
          date: "",
          distance: "",
          time: "",
          location: "",
        });
      }
    } catch (error) {
      console.error("API Error:", error);
      if (error.response) {
        // Handle JSON error responses
        if (typeof error.response.data === "object") {
          setError(error.response.data.message || "Failed to add race.");
        }
        // Handle HTML error responses (like 404 page)
        else if (typeof error.response.data === "string") {
          setError("Server error. Please try again.");
        }
      } else {
        setError("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-zinc-800 rounded-2xl p-6 w-full max-w-md border border-white/10 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Add Recent Race</h2>
            <Link to="/profile">
              <button className="text-gray-400 hover:text-white">
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </Link>
          </div>

          {message && success && (
            <div className="bg-green-500/20 border border-green-500 text-green-300 p-3 rounded-lg mb-4">
              {message}
            </div>
          )}

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Race Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 bg-zinc-700/50 rounded-lg border border-white/10 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-2 bg-zinc-700/50 rounded-lg border border-white/10 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Distance (km)
                </label>
                <select
                  name="distance"
                  value={formData.distance}
                  onChange={handleChange}
                  className="w-full p-2 bg-zinc-700/50 rounded-lg border border-white/10 focus:border-blue-500 focus:outline-none"
                  required
                >
                  <option value="">Select a distance</option>
                  {DISTANCE_OPTIONS.map((distance) => (
                    <option key={distance} value={distance}>
                      {distance} km
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Time (HH:MM:SS)
                </label>
                <input
                  type="text"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  placeholder="01:45:30"
                  className="w-full p-2 bg-zinc-700/50 rounded-lg border border-white/10 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Time in Seconds
                </label>
                <input
                    disabled
                  type="number"
                  name="time"
                  value={formData.timeInSeconds}
                  onChange={handleChange}
                  placeholder="6300"
                  className="w-full p-2 bg-zinc-700/50 rounded-lg border border-white/10 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-2 bg-zinc-700/50 rounded-lg border border-white/10 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Link to="/profile">
                <button
                  type="button"
                  className="mr-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-zinc-700"
                >
                  Cancel
                </button>
              </Link>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Race"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddRecentRace;
