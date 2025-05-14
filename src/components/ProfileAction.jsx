import { useState, useEffect, useRef } from "react";
import { LogIn, UserPlus, User, PlusCircle, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import useAuthStore from "../store/authStore"; // Make sure the import matches your file structure

const ProfileAction = () => {
  const { user, isAuthenticated, signOut } = useAuthStore(); // Get auth state from store
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        !event.target.closest(".profile-button")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    signOut();
    setIsOpen(false);
  };

  return (
    <>
      <div className="relative">
        {/* Profile icon - Shows user image if authenticated, placeholder if not */}
        <button 
          className="profile-button focus:outline-none w-12.5 h-12.5 rounded-full bg-neutral-400 items-center flex justify-center hover:bg-neutral-500 cursor-pointer" 
          onClick={togglePanel}
        >
          {isAuthenticated ? (
            <img
              className="w-12 h-12 rounded-full"
              src={user?.avatar || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}
              alt={user?.name || "Profile"}
            />
          ) : (
            <User className="w-6 h-6 text-white" />
          )}
        </button>

        {/* Profile actions panel */}
        {isOpen && (
          <div
            ref={panelRef}
            className="absolute right-0 mt-2 w-80 sm:w-50 bg-zinc-800/60 backdrop-blur-lg border border-zinc-100/10 rounded-lg shadow-lg z-50 transition-all duration-300 transform origin-top-right"
            style={{
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            {/* Panel header - Show user info if authenticated */}
            {isAuthenticated && (
              <div className="px-4 py-3 border-b border-gray-700">
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-3">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={user?.profileImage || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}
                      alt={user?.name || "Profile"}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{user?.name || "User"}</p>
                    <p className="text-xs text-gray-400">{user?.email || ""}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Menu options */}
            <div className="space-y-1">
              {isAuthenticated ? (
                // Options for authenticated users
                <>
                  <NavLink 
                    to="/profile" 
                    className="block px-4 py-3 hover:bg-gray-700 border-b border-gray-700 last:border-b-0"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center">
                      <User className="w-5 h-5 mr-3 text-gray-300" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-100">Profile</p>
                      </div>
                    </div>
                  </NavLink>
                  
                  <NavLink 
                    to="/addActivity" 
                    className="block px-4 py-3 hover:bg-gray-700 border-b border-gray-700 last:border-b-0"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center">
                      <PlusCircle className="w-5 h-5 mr-3 text-gray-300" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-100">Add Activity</p>
                      </div>
                    </div>
                  </NavLink>
                  
                  <button 
                    onClick={handleLogout}
                    className="block w-full px-4 py-3 hover:bg-gray-700 border-b border-gray-700 last:border-b-0 text-start cursor-pointer"
                  >
                    <div className="flex items-center">
                      <LogOut className="w-5 h-5 mr-3 text-gray-300" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-100">Log Out</p>
                      </div>
                    </div>
                  </button>
                </>
              ) : (
                // Options for non-authenticated users
                <>
                  <NavLink 
                    to="/signin" 
                    className="block px-4 py-3 hover:bg-gray-700 border-b border-gray-700 last:border-b-0"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center">
                      <LogIn className="w-5 h-5 mr-3 text-gray-300" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-100">Sign In</p>
                      </div>
                    </div>
                  </NavLink>
                  
                  <NavLink 
                    to="/signup" 
                    className="block px-4 py-3 hover:bg-gray-700 border-b border-gray-700 last:border-b-0"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center">
                      <UserPlus className="w-5 h-5 mr-3 text-gray-300" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-100">Sign Up</p>
                      </div>
                    </div>
                  </NavLink>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileAction;