import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const ProfileAction = () => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);

  // Cierra el panel cuando se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        !event.target.closest(".notification-bell")
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

  return (
    <>
      <div className="relative">
        {/* Profile icon */}
        <button className="focus:outline-none w-12.5 h-12.5 rounded-full bg-neutral-400 items-center flex justify-center hover:bg-neutral-500 cursor-pointer" onClick={togglePanel}>
          <img
            className="w-10 h-10 rounded-full"
            src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
            alt="Profile"
          />
        </button>

        {/* Profile actions */}
        {isOpen && (
          <div
            ref={panelRef}
            className="absolute right-0 mt-2 w-80 sm:w-50 bg-zinc-800/60 backdrop-blur-lg border border-zinc-100/10 rounded-lg shadow-lg z-50 transition-all duration-300 transform origin-top-right"
            style={{
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >

            {/* Lista de notificaciones */}
            <div className="space-y-1">
                <div>
                    <Link to="/Profile" className="block px-4 py-3 hover:bg-gray-700 border-b border-gray-700 last:border-b-0">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-3">
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-100">
                            Profile
                          </p>
                        </div>
                      </div>
                    </Link>
                </div>
                <div>
                    <Link to="/AddActivity" className="block px-4 py-3 hover:bg-gray-700 border-b border-gray-700 last:border-b-0">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-3">
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-100">
                            Add Activity
                          </p>
                        </div>
                      </div>
                    </Link>
                </div>
                <div>
                    <button className="block px-4 py-3 hover:bg-gray-700 border-b border-gray-700 last:border-b-0 w-full text-start cursor-pointer">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-3">
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-100">
                            Log Out
                          </p>
                        </div>
                      </div>
                    </button>
                </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default ProfileAction;
