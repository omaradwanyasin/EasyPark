import React, { useEffect } from "react";
import firstmap from "../../Images/Map.png";
import "../Home page/Home.css";
import Aos from "aos";
import "aos/dist/aos.css";
import BioCard from "../../Components/BioCard";
import map2 from "../../Images/Group.png";
import mock from "../../Images/deviceframes.png";
import HomePageBtn from "../../Components/HomePageBtn";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar/Navbar";

function Home(id = "home") {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div>
      <Navbar />
      {/* comment for push */}
      <div style={{ paddingTop: "80px" }}>
        <div className="Head-section">
          <div className="text-service-section" data-aos="fade-down">
            <h1>EasyPark: Your Instant Parking Solution</h1>
            <p>
              Discover EasyPark: Instantly find parking spots near you with just
              a tap. Say goodbye to parking woes and hello to convenience!
            </p>
            <div>
              <HomePageBtn name="Serivces" destination="/service" />
              {/* <Button>Explore Service</Button> */}
            </div>
          </div>
          <div data-aos="zoom-in">
            <img style={{ width: "130%" }} src={firstmap} />
          </div>
        </div>
        <div className="seconde-head">
          <h3 data-aos="zoom-in">Revolutionizing Parking in Palestine</h3>
          <p data-aos="zoom-in" style={{ width: "40%", margin: "auto" }}>
            Say goodbye to the frustration of searching for parking spots in
            Palestine. EasyPark is proud to introduce the first-ever parking
            spot finder dedicated to Palestinian cities.
          </p>
          <div className="cards" data-aos="zoom-in">
            <BioCard
              text={"Instantly locate available parking spots near you"}
            />
            <BioCard
              text={
                "Real-time updates on parking availability to save you time"
              }
            />
            <BioCard text={"User Friendly Interface"} />
          </div>
          <div className="last-section">
            <div>
              <img src={map2} data-aos="zoom-in"></img>
            </div>
            <div className="subtext">
              <h1 data-aos="fade-down">
                Our platform is designed to make parking a hassle-free
                experience for users like you.
              </h1>
              <p data-aos="fade-down">
                Whether you're searching for parking spaces, managing your own
                garage, or both, our platform offers a seamless solution
                tailored to your needs.
              </p>
            </div>
          </div>

          <div className="mock-dashbord">
            <h1 data-aos="fade-down">
              {" "}
              inteactive interface with real- time state for garage owner's{" "}
            </h1>

            <img width={1500} src={mock} data-aos="zoom-in" />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Home;
