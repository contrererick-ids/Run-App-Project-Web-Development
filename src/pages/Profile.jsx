import { useState } from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  // Datos de usuario (en un escenario real, esto vendría de una API)
  const userData = {
    name: "salvador rodriguez",
    ageGroup: "M27",
    location: "MEX",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
    vdot: 32.0,
    upcomingRaces: [
      { date: "05/18/2025", name: "21K Zapopan", link: "21K-zapopan", projectedTime: "2:00:00" },
      { date: "07/13/2025", name: "21k CDMX", link: "21K-cdmx", projectedTime: "2:00:00" }
    ],
    personalRecords: [
      { event: "Half Marathon", result: "2:07:28", vdot: 33.8 }
    ],
    recentRaces: [
      { event: "Half Marathon", date: "02/23/25", name: "21K GDL", link: "21K-gdl", result: "2:07:28", avgPace: "6:03", vdot: 33.9 },
      { event: "Half Marathon", date: "09/01/24", name: "21K Atlas", link: "21K-atlas", result: "2:25:00", avgPace: "6:52", vdot: 28.1 }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto my-10 rounded-3xl p-8 bg-zinc-700/30 backdrop-blur-lg border border-white/10 shadow-2xl">
      {/* Perfil del usuario */}
      <div className="flex flex-col md:flex-row items-center md:items-center gap-6 mb-8">
        <div className="relative justify-center items-center">
          <img 
            src={userData.photoUrl} 
            alt={userData.name} 
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-200" 
          />
          <button className="text-sm text-neutral-100 hover:text-blue-100 mt-2 block px-7">
            Edit Photo
          </button>
        </div>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-extrabold capitalize">{userData.name}</h1>
              <div className="text-gray-100 mt-1">
                <p>Age Group: {userData.ageGroup}</p>
                <p>Location: {userData.location}</p>
              </div>
              <button className="text-blue-100 hover:text-blue-50 cursor-pointer   text-sm mt-1 border rounded-2xl px-5 py-1 bg-blue-100/30 backdrop-blur-lg border-neutral-50/5 shadow-2xl">
                Edit Profile
              </button>
            </div>
            
            <div className="mt-4 md:mt-0">
              <div className="border-4 border-gray-300 bg-sky-400/10 backdrop-blur-2xl rounded-full w-32 h-32 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-md text-sky-400 font-extrabold">VDOT</div>
                  <div className="text-4xl font-bold">{userData.vdot}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Próximas carreras */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="mr-2">👟</span>
            <h2 className="text-xl font-semibold">Upcoming Races</h2>
          </div>
          <button className="text-blue-500 p-1 rounded-full hover:bg-blue-50/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-gray-200">
            <thead>
              <tr>
                <th className="py-3 text-left text-lg font-bold text-neutral-100 uppercase tracking-wider px-6 ">Date</th>
                <th className="py-3 text-left text-lg font-bold text-neutral-100 uppercase tracking-wider px-6 ">Name</th>
                <th className="py-3 text-right text-lg font-bold text-neutral-100 uppercase tracking-wider px-6 ">Projected Time</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-gray-300 ">
              {userData.upcomingRaces.map((race, index) => (
                /*  */
                <tr key={index}>
                  <td className="py-3 text-md font-bold pl-6  text-blue-600/100 dark:text-sky-400/100 ">{race.date}</td>
                  <td className="py-3 text-md text-neutral-100 hover:text-sky-400 font-bold">
                    <Link to={`/races/${race.link}`}>{race.name}</Link>
                  </td>
                  <td className="py-5 pr-6 text-md text-right text-sky-400 font-extrabold">{race.projectedTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Récords personales */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="mr-2">🏆</span>
            <h2 className="text-xl font-semibold">Personal Records</h2>
          </div>
          <button className="text-blue-500 p-1 rounded-full hover:bg-blue-50/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-gray-200">
            <thead>
              <tr>
                <th className="py-3 text-left text-lg font-medium text-gray-100 px-5 uppercase tracking-wider">Event</th>
                <th className="py-3 text-right text-lg font-medium text-gray-100 px-5 uppercase tracking-wider">Result</th>
                <th className="py-3 text-right text-lg font-medium text-gray-100 px-5 uppercase tracking-wider">VDOT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {userData.personalRecords.map((record, index) => (
                <tr key={index}>
                  <td className="py-3 text-md text-sky-400 hover:text-sky-500 text-start pl-5">
                    <Link>{record.event}</Link>
                  </td>
                  <td className="py-3 text-md text-right pr-5 text-sky-400 font-bold">{record.result}</td>
                  <td className="py-3 text-right">
                    <span className="inline-flex items-center justify-center px-2 py-1.5 mr-5 text-xs font-bold rounded-full bg-gray-200/20">
                      {record.vdot}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Carreras recientes */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="mr-2">⏱️</span>
            <h2 className="text-xl font-semibold">Recent Races</h2>
          </div>
          <button className="text-blue-500 p-1 rounded-full hover:bg-blue-50/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className=''>
              <tr>
                <th className="py-3 text-start text-lg font-medium text-gray-100  uppercase ">Event</th>
                <th className="py-3 text-start text-lg font-medium text-gray-100  uppercase ">Date</th>
                <th className="py-3 text-start text-lg font-medium text-gray-100  uppercase ">Name</th>
                <th className="py-3 text-start text-lg font-medium text-gray-100  uppercase ">Result</th>
                <th className="py-3 text-start text-lg font-medium text-gray-100  uppercase ">Average Pace</th>
                <th className="py-3 text-start text-lg font-medium text-gray-100  uppercase ">VDOT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {userData.recentRaces.map((race, index) => (
                <tr key={index}>
                  <td className="py-3 text-md text-gray-100 font-bold">{race.event}</td>
                  <td className="py-3 text-md text-sky-400 font-bold">{race.date}</td>
                  <td className="py-3 text-md text-neutral-50 font-bold hover:text-blue-700">
                    <Link to={`/races/${race.link}`}>{race.name}</Link>
                  </td>
                  <td className="py-3 text-md  text-sky-400 font-bold">{race.result}</td>
                  <td className="py-3 text-md font-bold text-center text-neutral-50">{race.avgPace}</td>
                  <td className="py-3 text-center">
                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full bg-gray-200/20 ">
                      {race.vdot}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;