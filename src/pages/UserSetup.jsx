import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../store/authStore";

const UserSetup = () => {
  const API_URL = "https://web-back-4n3m.onrender.com";
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    distance: "",
    location: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, setUser } = useAuthStore();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/signin");
  }

  const availableRaces = {
    FiveK: 5,
    TenK: 10,
    HalfMarathon: 21.0975,
    Marathon: 42.195,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Convert time (HH:MM:SS) to seconds
  const convertTimeToSeconds = (timeString) => {
    const timeParts = timeString.split(":");
    if (timeParts.length === 3) {
      const hours = parseInt(timeParts[0], 10);
      const minutes = parseInt(timeParts[1], 10);
      const seconds = parseInt(timeParts[2], 10);
      return hours * 3600 + minutes * 60 + seconds;
    }
    return 0;
  };

  // Format race distance for API call
  const formatRaceType = (distance) => {
    switch (parseFloat(distance)) {
      case 5:
        return "fiveK";
      case 10:
        return "tenK";
      case 21.0975:
        return "halfMarathon";
      case 42.195:
        return "marathon";
      default:
        return null;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate required fields
      if (!formData.date || !formData.time || !formData.distance) {
        setError("Please fill in all required fields");
        setLoading(false);
        return;
      }

      // Convert time to seconds for storing
      const timeInSeconds = convertTimeToSeconds(formData.time);
      if (isNaN(timeInSeconds)) {
        setError("Invalid time format. Please use HH:MM:SS format.");
        setLoading(false);
        return;
      }

      // Format data for the VDot API call
      const vdotData = {
        personalBests: {
          distance: parseFloat(formData.distance),
          time: timeInSeconds, // Send as seconds
          date: formData.date
        }
      };

      // Update VDOT
      const vdotResponse = await axios.put(
        `${API_URL}/api/v1/user/vdot/${user._id}`,
        vdotData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Update the corresponding personal best record
      const raceType = formatRaceType(formData.distance);
      if (raceType) {
        const pbData = {
          personalBests: {
            [raceType]: {
              date: formData.date,
              time: formData.time,
              timeInSeconds,
              location: formData.location || "Not specified",
            },
          },
        };

        await axios.put(`${API_URL}/api/v1/user/pb/${user._id}`, pbData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }

      // Add to recent races
      const recentRaceData = {
        name:
          formData.name ||
          `Race on ${new Date(formData.date).toLocaleDateString()}`,
        location: formData.location || "Not specified",
        distance: parseFloat(formData.distance),
        time: formData.time,
        timeInSeconds,
        date: formData.date,
      };

      await axios.put(
        `${API_URL}/api/v1/user/recent/${user._id}`,
        recentRaceData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Update user in store
      setUser(vdotResponse.data.user);

      // Navigate to dashboard or other page
      navigate("/dashboard");
    } catch (err) {
      console.error("Error updating VDOT and PB:", err);
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    // Set a default VDot of 30 if skipping
    const setDefaultVdot = async () => {
      try {
        setLoading(true);
        const response = await axios.put(
          `${API_URL}/api/v1/user/vdot/${user._id}`,
          { manualVdot: 30 },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setUser(response.data.user);
        navigate("/dashboard");
      } catch (err) {
        console.error("Error setting default VDOT:", err);
        setError(err.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    setDefaultVdot();
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md p-6 bg-zinc-400/20 backdrop-blur-2xl rounded-lg shadow-lg border border-gray-100/20">
          <h1 className="text-3xl font-bold text-center mb-6 pt-5 text-gray-100">
            Set Up Your VDot
          </h1>
          {error && (
            <div className="mb-4 p-2 bg-red-500/50 text-white rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-md font-bold text-gray-100 mb-2.5"
              >
                <span className="text-gray-100">Race Name (Optional)</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="e.g. Boston Marathon"
                className="text-white w-full px-4 py-2 bg-zinc-200/20 border border-gray-100/30 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="date"
                className="block text-md font-bold text-gray-100 mb-2.5"
              >
                <span className="text-gray-100">Race Date *</span>
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="text-white w-full px-4 py-2 bg-zinc-200/20 border border-gray-100/30 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="time"
                className="block text-md font-bold text-gray-100 mb-2.5"
              >
                <span className="text-gray-100">PB Time * (HH:MM:SS)</span>
              </label>
              <input
                type="text"
                id="time"
                name="time"
                placeholder="01:20:00"
                className="text-white w-full px-4 py-2 bg-zinc-200/20 border border-gray-100/30 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.time}
                onChange={handleChange}
                pattern="^(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="location"
                className="block text-md font-bold text-gray-100 mb-2.5"
              >
                <span className="text-gray-100">Location (Optional)</span>
              </label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="e.g. Boston, MA"
                className="text-white w-full px-4 py-2 bg-zinc-200/20 border border-gray-100/30 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div className="mb-7">
              <label
                htmlFor="distance"
                className="block text-md font-bold text-gray-100 mb-2.5"
              >
                <span className="text-gray-100">Distance *</span>
              </label>
              <select
                id="distance"
                name="distance"
                className="text-white w-full px-4 py-2 bg-zinc-200/20 border border-gray-100/30 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.distance}
                onChange={handleChange}
                required
              >
                <option value="">Select a distance</option>
                {Object.entries(availableRaces).map(([key, value]) => (
                  <option key={key} value={value}>
                    {key}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex mb-4 gap-4">
              <button
                type="button"
                onClick={handleSkip}
                disabled={loading}
                className="w-full py-2 px-4 bg-zinc-300/60 text-white font-semibold rounded hover:bg-zinc-500 transition duration-200"
              >
                {loading ? "Processing..." : "Skip"}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-sky-500 text-white font-semibold rounded hover:bg-sky-600 transition duration-200"
              >
                {loading ? "Processing..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserSetup;
