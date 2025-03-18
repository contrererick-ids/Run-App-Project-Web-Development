import { Link } from "react-router-dom";
import NotificationPanel from "./NotificationPanel";
import ProfileAction from "./ProfileAction";

const Header = () => {
  return (
    <>
      <nav className=" flex gap-6 items-center p-4 bg-neutral-800 shadow-2xl">
        <h1 className=" text-neutral-100 text-2xl">Run-App</h1>
        <ul className="flex gap-4 ">
          <li className=" hover:text-neutral-50">
            <Link to="/">Training</Link>
          </li>
          <li className=" hover:text-neutral-50 active:underline-1">
            <Link to="/SignIn">Log In</Link>
          </li>
          <li className=" hover:text-neutral-50">
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
        <div className="flex justify-end items-center ml-auto">
          <div className=" flex gap-4 items-center mr-2">
              <NotificationPanel />
              <ProfileAction />
          </div>
        </div>
      </nav>
    </>
  );
};
export default Header;
