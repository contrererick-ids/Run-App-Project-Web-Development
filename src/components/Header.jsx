import { NavLink } from "react-router-dom";
import NotificationPanel from "./NotificationPanel";
import ProfileAction from "./ProfileAction";
import useAuthStore from "../store/authStore"; // Import auth store

const Header = () => {
  const { isAuthenticated } = useAuthStore(); // Get authentication status

  return (
    <>
      <nav className="flex gap-6 items-center p-4 bg-neutral-800 shadow-2xl">
        <NavLink to="/" className="text-neutral-100 text-2xl font-bold">Run-App</NavLink>
        
        <ul className="flex gap-4">
          {/* Show these links only if user is NOT authenticated */}
          {!isAuthenticated && (
            <>
              <li>
                <NavLink
                  to="/signin"
                  className={({ isActive }) =>
                    isActive ? "text-neutral-50 underline" : "text-neutral-400 hover:text-neutral-50"
                  }
                >
                  Log In
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive ? "text-neutral-50 underline" : "text-neutral-400 hover:text-neutral-50"
                  }
                >
                  Sign Up
                </NavLink>
              </li>
            </>
          )}
          
          {/* Show these links only if user IS authenticated */}
          {isAuthenticated && (
            <>
              <li>
                <NavLink
                  to="/d"
                  className={({ isActive }) =>
                    isActive ? "text-neutral-50 underline" : "text-neutral-400 hover:text-neutral-50"
                  }
                >
                  Dashboard
                </NavLink>
              </li>
            </>
          )}
        </ul>
        
        {/* Right side - notification and profile actions */}
        <div className="flex justify-end items-center ml-auto">
          <div className="flex gap-4 items-center mr-2">
            {/* Only show notifications panel if user is authenticated */}
            {isAuthenticated && <NotificationPanel />}
            <ProfileAction />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;