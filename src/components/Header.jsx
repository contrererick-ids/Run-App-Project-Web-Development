import { IoNotificationsSharp } from "react-icons/io5";

const Header = () => {
  return (
    <>
      <nav className=" flex gap-6 items-center p-4 bg-neutral-800 shadow-2xl">
        <h1 className=" text-neutral-100 text-2xl">Run-App</h1>
        <ul className="flex gap-4 ">
          <li className=" hover:text-neutral-50">
            <a href="/">Training</a>
          </li>
          <li className=" hover:text-neutral-50">
            <a href="/about">What's new</a>
          </li>
        </ul>
        <div className="flex justify-end items-center ml-auto">
          <div className=" flex gap-4 items-center mr-2">
            <IoNotificationsSharp className="text-3xl text-neutral-200 hover:text-neutral-50 cursor-pointer" />
            <div className="w-0.5 rounded-md h-11 bg-neutral-500"></div>
            <div className="w-12.5 h-12.5 rounded-full bg-neutral-400 items-center flex justify-center">
              <img
                className="w-10 h-10 rounded-full"
                src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                alt=""
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Header;
