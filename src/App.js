import logo from "./logo.svg";
import "./App.css";
import Signup from "./Pages/MainLogin/Signup";
import Login from "./Pages/MainLogin/Login";
import GarageOwner from "./Pages/MainLogin/GarageOwner";
import Home from "./Pages/Home page/Home";
import Navgation from "./Components/Navbar/Navgation";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Service from "./Pages/Service page/Service";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Service",
    element: <Service />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
