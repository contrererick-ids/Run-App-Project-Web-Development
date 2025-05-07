import { useState, useEffect } from "react";
import axios from "axios";
import useAuthStore from "../store/authStore";

const API_URL = "https://web-back-4n3m.onrender.com";

const RaceEntryModal = ({ isOpen, onClose, type, onSuccess }) => {
  const { user } = useAuthStore();
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
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Reset form when modal opens or type changes
  // Note: This should be useEffect instead of useState
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        date: "",
        distance: "",
        time: "",
        location: "",
      });
      setError(null);
    }
  }, [isOpen, type]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No authentication token found");
      }

      // Use the correct API endpoint for the race type
      // Note: Based on the error message, we're adjusting the endpoint format
      const endpoint = type === "upcoming" 
        ? `${API_URL}/api/v1/user/upcoming/${user._id}`
        : `${API_URL}/api/v1/user/recent/${user._id}`;

      // Convert form data for API
      const raceData = {
        ...formData,
        // Parse distance to number if needed
        distance: parseFloat(formData.distance),
        // Calculate timeInSeconds if it's a recent race
        ...(type === "recent" && {
          timeInSeconds: calculateTimeInSeconds(formData.time)
        })
      };

      // Make API request - using the correct HTTP method
      // Based on the error, we need to debug what the API expects
      console.log(`Sending ${type} race data to ${endpoint}`);
      
      const response = await axios({
        method: 'put',
        url: endpoint,
        data: raceData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      });

      // Handle success
      if (response.data.success) {
        onSuccess(raceData);
        onClose();
      } else {
        throw new Error(response.data.message || "Failed to add race");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Failed to save race data"
      );
    } finally {
      setLoading(false);
    }
  };

  // Helper function to calculate seconds from HH:MM:SS format
  const calculateTimeInSeconds = (timeString) => {
    if (!timeString) return 0;
    
    const parts = timeString.split(":");
    let seconds = 0;
    
    if (parts.length === 3) {
      // HH:MM:SS
      seconds = parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
    } else if (parts.length === 2) {
      // MM:SS
      seconds = parseInt(parts[0]) * 60 + parseInt(parts[1]);
    } else {
      // SS
      seconds = parseInt(parts[0]);
    }
    
    return seconds;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-800 rounded-2xl p-6 w-full max-w-md border border-white/10 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">
            Add {type === "upcoming" ? "Upcoming" : "Recent"} Race
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Race Name</label>
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
              <label className="block text-sm font-medium mb-1">Distance (km)</label>
              <input
                type="number"
                step="0.01"
                name="distance"
                value={formData.distance}
                onChange={handleChange}
                className="w-full p-2 bg-zinc-700/50 rounded-lg border border-white/10 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Time (HH:MM:SS)</label>
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
              <label className="block text-sm font-medium mb-1">Location</label>
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
            <button
              type="button"
              onClick={onClose}
              className="mr-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-zinc-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
            >
              {loading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              Save Race
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RaceEntryModal;