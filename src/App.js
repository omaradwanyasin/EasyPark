import "./App.css";
import Signup from "./Pages/MainLogin/Signup.tsx";
import Home from "./Pages/Home page/Home";
import Service from "./Pages/Service page/Service";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GarageOwner from "./Pages/MainLogin/GarageOwner.tsx";
import Contact from "./Pages/Contact/Contact";
import DashboardPage from "./Pages/Dashboard/DashboardPage";
import Login from "./Pages/MainLogin/Login.tsx";
import SignMap from "./Pages/MainLogin/SignMap.jsx";
import Payment from "./Pages/Payment/Payment";


function App() {
  return (
    <div className="App">
      <BrowserRouter>

      <Routes>
        <Route index element ={<Home/>}/>
        <Route path="/home" element ={<Home/>} />
        <Route path="/login" element ={<Login/>} />
        <Route path="/signup" element ={<Signup/>} />
        <Route path="/service" element ={<Service/>} />
        <Route path="/Garageowner" element ={<GarageOwner/>} />
        <Route path="/contact" element ={<Contact/>} />
        <Route path="/test" element ={<DashboardPage/>} />
        <Route path="/test2" element={<SignMap/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
