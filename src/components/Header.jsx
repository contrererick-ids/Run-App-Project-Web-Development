import { NavLink } from "react-router-dom";
import NotificationPanel from "./NotificationPanel";
import ProfileAction from "./ProfileAction";

const Header = () => {
  return (
    <>
      <nav className="flex gap-6 items-center p-4 bg-neutral-800 shadow-2xl">
        <h1 className="text-neutral-100 text-2xl">Run-App</h1>
        <ul className="flex gap-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-neutral-50 underline" : "hover:text-neutral-50"
              }
            >
              Training
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signin"
              className={({ isActive }) =>
                isActive ? "text-neutral-50 underline" : "hover:text-neutral-50"
              }
            >
              Log In
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive ? "text-neutral-50 underline" : "hover:text-neutral-50"
              }
            >
              Sign Up
            </NavLink>
          </li>
        </ul>
        <div className="flex justify-end items-center ml-auto">
          <div className="flex gap-4 items-center mr-2">
            <NotificationPanel />
            <ProfileAction />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
