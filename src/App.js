import React, { useState, useEffect } from "react";
import "./App.css";
import Signup from "./Pages/MainLogin/Signup.tsx";
import Home from "./Pages/Home page/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GarageOwner from "./Pages/MainLogin/GarageOwner.tsx";
import Contact from "./Pages/Contact/Contact";
import DashboardPage from "./Pages/Dashboard/DashboardPage";
import Login from "./Pages/MainLogin/Login.tsx";
import SignMap from "./Pages/MainLogin/SignMap.jsx";
import Payment from "./Pages/Payment/Payment";
import Nservice from "./Pages/Service page/Nservice";
import Navbar from "./Components/Navbar/Navbar.jsx";
import About from "./Pages/About/About.jsx";
import Garage from "./Pages/MainLogin/Garage.tsx";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { SignalRProvider } from "./signalRService";  // Import SignalRProvider
import NotificationListener from "./NotificationListener.jsx";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="App">
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <ClimbingBoxLoader
            color={"#3636d6"}
            loading={true}
            size={15}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <SignalRProvider> {/* Wrap the app with SignalRProvider */}
          <BrowserRouter>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/Garageowner" element={<GarageOwner />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/test" element={<DashboardPage />} />
              <Route path="/Garageowner/Garage" element={<Garage />} />
              <Route path="/test2" element={<SignMap />} />
              <Route path="/service" element={<Nservice />} />
              <Route path="/test4" element={<Navbar />} />
              <Route path="/AboutUs" element={<About />} />
              <Route path="/pay" element={<Payment />} />
            </Routes>
            <NotificationListener /> {/* Add NotificationListener to listen for notifications */}
          </BrowserRouter>
        </SignalRProvider>
      )}
    </div>
  );
}

export default App;
