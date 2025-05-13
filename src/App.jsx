import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import AddActivity from "./pages/AddActivity";
import ChatModal from "./components/ChatModal";
import { useState } from "react";

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  return (
    <Router>
      <div className="app-container"> {/* Add a wrapper div */}
        <Header />
        <main> {/* Consider adding a main element for better structure */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/addActivity" element={<AddActivity />} />
          </Routes>
        </main>
        <Footer />
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 bg-sky-500 hover:bg-sky-600 text-white rounded-full p-4 shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>
        <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      </div>
    </Router>
  );
}

export default App;
