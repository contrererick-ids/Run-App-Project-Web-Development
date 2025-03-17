import RunningCalendar from "../components/RunningCalendar";

const Home = () => {
  return (
    <>
      <div className=" m-10  border-b-4 border-sky-400 pb-4 flex flex-col items-center">
        <div className="w-50 h-50 rounded-full bg-neutral-400 items-center flex justify-center">
          <img
            className="w-40 h-40 rounded-full"
            src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
            alt=""
          />
        </div>
        <h1 className="text-4xl font-bold text-start text-neutral-50 mt-10">
          Welcome to Run-App
        </h1>
        <p className="text-start text-neutral-50 mt-2">
          Your personal running calendar
        </p>
      </div>
      <RunningCalendar />
    </>
  );
};
export default Home;
