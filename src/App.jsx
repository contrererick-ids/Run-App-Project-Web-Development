import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import RunningCalendar from "./components/RunningCalendar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/SignIn" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
