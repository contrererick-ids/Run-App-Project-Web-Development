import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import axios from 'axios';

const API_URL = 'https://web-back-4n3m.onrender.com';

const Profile = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // Get token from localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('No authentication token found');
        }
        
        // Use the user ID from the auth store to fetch the full user data
        const response = await axios.get(`${API_URL}/api/v1/user/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setUserData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };
    
    if (isAuthenticated && user?._id) {
      // First try with the user data we already have
      setUserData(user);
      // Then fetch fresh data from the server
      fetchUserData();
    }
  }, [isAuthenticated, user]);

  // Rest of the component remains the same...
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto my-10 rounded-3xl p-8 bg-zinc-700/30 backdrop-blur-lg border border-white/10 shadow-2xl">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto my-10 rounded-3xl p-8 bg-zinc-700/30 backdrop-blur-lg border border-white/10 shadow-2xl">
        <div className="text-red-500 text-center py-10">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="max-w-4xl mx-auto my-10 rounded-3xl p-8 bg-zinc-700/30 backdrop-blur-lg border border-white/10 shadow-2xl">
        <div className="text-center py-10">
          No user data available. Please sign in.
        </div>
      </div>
    );
  }

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="max-w-4xl mx-auto my-10 rounded-3xl p-8 bg-zinc-700/30 backdrop-blur-lg border border-white/10 shadow-2xl">
      {/* User Profile */}
      <div className="flex flex-col md:flex-row items-center md:items-center gap-6 mb-8">
        <div className="relative justify-center items-center">
          <img 
            src={userData?.avatar || "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"}
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-200" 
            alt="Profile"
          />
          <button className="text-sm text-neutral-100 hover:text-blue-100 mt-2 block px-7">
            Edit Photo
          </button>
        </div>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-extrabold capitalize">{userData.username}</h1>
              <div className="text-gray-100 mt-1">
                <p className='capitalize'>Username: {userData.username}</p>
                <p>Email: {userData.email}</p>
              </div>
              <button className="text-blue-100 hover:text-blue-50 cursor-pointer text-sm mt-1 border rounded-2xl px-5 py-1 bg-blue-100/30 backdrop-blur-lg border-neutral-50/5 shadow-2xl">
                Edit Profile
              </button>
            </div>
            
            <div className="mt-4 md:mt-0">
              <div className="border-4 border-gray-300 bg-sky-400/10 backdrop-blur-2xl rounded-full w-32 h-32 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-md text-sky-400 font-extrabold">VDOT</div>
                  <div className="text-4xl font-bold">
                    {userData.vDot?.value || '--'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Bests */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="mr-2">🏆</span>
            <h2 className="text-xl font-semibold">Personal Bests</h2>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-gray-200">
            <thead>
              <tr>
                <th className="py-3 text-left text-lg font-medium text-gray-100 px-5 uppercase tracking-wider">Distance</th>
                <th className="py-3 text-left text-lg font-medium text-gray-100 px-5 uppercase tracking-wider">Time</th>
                <th className="py-3 text-left text-lg font-medium text-gray-100 px-5 uppercase tracking-wider">Date</th>
                <th className="py-3 text-left text-lg font-medium text-gray-100 px-5 uppercase tracking-wider">Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {['fiveK', 'tenK', 'halfMarathon', 'marathon'].map((distance) => (
                userData.personalBests?.[distance]?.time && (
                  <tr key={distance}>
                    <td className="py-3 text-md text-sky-400 hover:text-sky-500 text-start pl-5 capitalize">
                      {distance.replace(/([A-Z])/g, ' $1').trim()}
                    </td>
                    <td className="py-3 text-md text-neutral-100 font-bold">
                      {userData.personalBests[distance].time}
                    </td>
                    <td className="py-3 text-md text-neutral-100">
                      {formatDate(userData.personalBests[distance].date)}
                    </td>
                    <td className="py-3 text-md text-neutral-100">
                      {userData.personalBests[distance].location || 'N/A'}
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upcoming Races */}
      {userData.upcomingRaces?.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <span className="mr-2">👟</span>
              <h2 className="text-xl font-semibold">Upcoming Races</h2>
            </div>
            <Link to="/races/add" className="text-blue-500 p-1 rounded-full hover:bg-blue-50/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y-2 divide-gray-200">
              <thead>
                <tr>
                  <th className="py-3 text-left text-lg font-bold text-neutral-100 uppercase tracking-wider px-6">Date</th>
                  <th className="py-3 text-left text-lg font-bold text-neutral-100 uppercase tracking-wider px-6">Name</th>
                  <th className="py-3 text-right text-lg font-bold text-neutral-100 uppercase tracking-wider px-6">Projected Time</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-gray-300">
                {userData.upcomingRaces.map((race, index) => (
                  <tr key={index}>
                    <td className="py-3 text-md font-bold pl-6 text-blue-600/100 dark:text-sky-400/100">
                      {formatDate(race.date)}
                    </td>
                    <td className="py-3 text-md text-neutral-100 hover:text-sky-400 font-bold">
                      {race.name}
                    </td>
                    <td className="py-5 pr-6 text-md text-right text-sky-400 font-extrabold">
                      {race.projectedTime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recent Races */}
      {userData.recentRaces?.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <span className="mr-2">⏱️</span>
              <h2 className="text-xl font-semibold">Recent Races</h2>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className=''>
                <tr>
                  <th className="py-3 text-start text-lg font-medium text-gray-100 uppercase">Name</th>
                  <th className="py-3 text-start text-lg font-medium text-gray-100 uppercase">Date</th>
                  <th className="py-3 text-start text-lg font-medium text-gray-100 uppercase">Distance (km)</th>
                  <th className="py-3 text-start text-lg font-medium text-gray-100 uppercase">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {userData.recentRaces.map((race, index) => (
                  <tr key={index}>
                    <td className="py-3 text-md text-neutral-50 font-bold hover:text-blue-700">
                      {race.name}
                    </td>
                    <td className="py-3 text-md text-sky-400 font-bold">
                      {formatDate(race.date)}
                    </td>
                    <td className="py-3 text-md font-bold text-center text-neutral-50">
                      {race.distance}
                    </td>
                    <td className="py-3 text-md text-sky-400 font-bold">
                      {race.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Training Paces */}
      {userData.vDot?.trainingPaces && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <span className="mr-2">🏃</span>
              <h2 className="text-xl font-semibold">Training Paces</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(userData.vDot.trainingPaces).map(([type, pace]) => (
              pace && (
                <div key={type} className="bg-gray-800/50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-sky-400 capitalize">
                    {type.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  <p className="text-xl font-bold text-neutral-100">
                    {pace}
                  </p>
                </div>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;