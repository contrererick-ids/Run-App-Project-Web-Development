import { useState } from "react";
import axios from "axios";
import { uploadProfileImage } from "../utils/fireStore.js"; // Asegúrate de que esta función esté correctamente importada
import useAuthStore from "../store/authStore.js"
//import { storage } from "../firebase.js";
import { CgSpinner } from "react-icons/cg";


const EditProfilePic = ({ currentAvatar ,userId }) => {
  const API_URL = "https://web-back-4n3m.onrender.com";
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const updateUser = useAuthStore((state) => state.updateUser);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsLoading(true);
      setError(null);

      // 1. Subir a Firebase Storage
      const imageUrl = await uploadProfileImage(userId, file);

      // 2. Actualizar en tu backend
      await axios.put(
        `${API_URL}/api/v1/user/${userId}`,
        { avatar: imageUrl },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // 3. Actualizar Zustand
      updateUser({ avatar: imageUrl });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="max-w-4xl mx-auto my-10 rounded-3xl p-8 bg-zinc-700/30 backdrop-blur-lg border border-white/10 shadow-2xl">
        <div className="text-red-500 text-center py-10">Error: {error}</div>
      </div>
    );
  }

  const defaultAvatar = "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"

  return (
    <>
      <div className="relative group">
        <img
          src={
            currentAvatar ||
            defaultAvatar
          }
          className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
          alt="Profile"
        />

        <label
          htmlFor="avatar-upload"
          className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        >
          {isLoading ? (
            <CgSpinner size="sm" />
          ) : (
            <span className="text-white text-sm font-medium">Edit Profile Picture</span>
          )}
        </label>

        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={isLoading}
        />

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </>
  );
};
export default EditProfilePic;
