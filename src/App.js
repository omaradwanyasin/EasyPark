import logo from "./logo.svg";
import "./App.css";
import Signup from "./Pages/MainLogin/Signup";
import Login from "./Pages/MainLogin/Login";
import GarageOwner from "./Pages/MainLogin/GarageOwner";
import Home from "./Pages/Home page/Home";
import Navgation from "./Components/Navbar/Navgation";

function App() {
  return (
    <div className="App">
      <Navgation />
      <Home />
    </div>
  );
}

export default App;
