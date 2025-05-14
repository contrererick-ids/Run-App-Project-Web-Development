import { Link } from "react-router-dom";
import TrainingCalendar from "../components/TrainingCalendar";
import React, { useState, useEffect } from 'react';


const Home = () => {
  return (
    <>
      <div className="m-4 sm:m-6 md:m-10 border-b-2 border-zinc-400/30 pb-2 sm:pb-4 flex flex-col items-center">
        <Link
          to="/profile"
          className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-neutral-400 items-center flex justify-center"
        >
          <img
            className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full"
            src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
            alt=""
          />
        </Link>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-start text-neutral-50 mt-4 sm:mt-6 md:mt-10">
          Welcome to Run-App
        </h1>
        <p className="text-sm sm:text-base text-start text-neutral-50 mt-1 sm:mt-2">
          Your personal running calendar
        </p>
      </div>
      <TrainingCalendar
      />
    </>
  );
};
export default Home;
