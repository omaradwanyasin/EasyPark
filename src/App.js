import logo from "./logo.svg";
import "./App.css";
import Signup from "./Pages/MainLogin/Signup";
import Login from "./Pages/MainLogin/Login";
import GarageOwner from "./Pages/MainLogin/GarageOwner";
import Home from "./Pages/Home";
import Navgation from "./Pages/Navbar/Navgation";

function App() {
  return <div className="App">{<Signup />}</div>;
}

export default App;
