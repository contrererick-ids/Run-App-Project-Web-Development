import { useState } from "react";
import axios from "axios";
import useAuthStore from "../store/authStore";

const VDotModal = ({ isOpen, onClose, user, onUpdate }) => {
  const [vdotValue, setVdotValue] = useState(user?.vDot?.value || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_URL = "https://web-back-4n3m.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      /* const { user } = useAuthStore();
      if (!user) throw new Error("User not found"); */

      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      const response = await axios.put(
        `${API_URL}/api/v1/user/vdot/${user._id}`,
        { manualVdot: parseFloat(vdotValue) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      onUpdate(response.data.user); // Update parent component with new data
      onClose();
    } catch (error) {
      console.error("VDOT update error:", error);
      setError(error.response?.data?.message || "Failed to update VDOT");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-800 rounded-2xl p-6 w-full max-w-md border border-white/10 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Update VDOT</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              VDOT Value (30-85)
            </label>
            <input
              type="number"
              value={vdotValue}
              onChange={(e) => setVdotValue(e.target.value)}
              className="w-full p-2 bg-zinc-700/50 rounded-lg border border-white/10 focus:border-blue-500 focus:outline-none"
              step="0.1"
              min="30"
              max="85"
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-gray-300 hover:bg-zinc-700"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VDotModal;
