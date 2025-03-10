import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Treatment from "./Pages/Treatment";
import NewPatient from "./Pages/Newpatient";
import OurPractices from "./Pages/OurPractices";
import ContactUs from "./Pages/Contactus";
import DrKapilGandhi from "./Pages/DrKapilGandhi";
import ChatIcon from "./Components/ChatIcon";
import Signin from "./Pages/Signin";
import SignUp from "./Pages/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS
import Appointment from "./Pages/Appointment";
import Index from "./Pages/Room";
import DentistTeam from "./Pages/DentistTeam";
import OurTeam from "./Pages/OurTeam";
import OurPhilosophy from "./Pages/Phylosophy";
import SetsApart from "./Pages/SetsApart";
import Services from "./Pages/Services";
import Profile from './Pages/Profile'

const App = () => {
  const location = useLocation();

  // Define the paths where the Navbar should be hidden
  const hideNavbarRoutes = ["/login", "/signup"];

  return (
    <div className="bg-white">
      <ToastContainer />
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <ChatIcon />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/treatment/:category/:id" element={<Treatment />} />
        <Route path="/treatment/:category" element={<Treatment />} />
        <Route path="/treatment" element={<Treatment />} />

        <Route path="/new-patient" element={<NewPatient />} />
        <Route path="/new-patient/:title" element={<NewPatient />} />
        <Route path="/new-patient/:category/:id" element={<NewPatient />} />
        
        <Route path="/our-practices" element={<OurPractices />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about" element={<DrKapilGandhi />} />
        <Route path="/about/philosophy" element={<OurPhilosophy />} />
        <Route path="/about/sets-us-apart" element={<SetsApart />} />
        <Route path="/book-appointment" element={<Appointment />} />
        <Route path="/room/:RoomId" element={<Index />} />
        <Route path="/about/team" element={<DentistTeam />} />
        <Route path="/ourteam" element={<OurTeam />} />
        <Route path="/services" element={<Services/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
      <ChatIcon />
      <Footer />
    </div>
  );
};

export default App;
