import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import AddActivity from "./pages/AddActivity";

function App() {
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
      </div>
    </Router>
  );
}

export default App;
