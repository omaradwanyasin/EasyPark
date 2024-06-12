import React, { useEffect } from "react";
import firstmap from "../../Images/Map.png";
import "../Home page/Home.css";
import Aos from "aos";
import "aos/dist/aos.css";
import BioCard from "../../Components/BioCard";
import map2 from "../../Images/Group.png";
import mock from "../../Images/lappad.png";
import HomePageBtn from "../../Components/HomePageBtn";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import Section2 from "../../Components/HomePageSection2/Section2";
import HomePageIntro from "../../Components/HomePageIntro/HomePageIntro";
import { Box } from "@mui/material";
import p1 from "./imgs/p1.jpg";
import p2 from "./imgs/p2.jpg";
import p3 from "./imgs/p3.jpg";

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
            <h1>
              <span>EasyPark</span> The smarter way to find parking
            </h1>
            <p>
              Instantly find parking spots near you with just a tap. Say goodbye
              to parking woes and hello to convenience!
            </p>
            <div>
              <HomePageBtn name="Find Parking" destination="/service" />
              {/* <Button>Explore Service</Button> */}
            </div>
          </div>
          <div data-aos="zoom-in">
            <img style={{ width: "100%" }} src={firstmap} />
          </div>
        </div>
        <div className="homePageIntro">
          <HomePageIntro />
        </div>

        <Box>
          <Section2 />
        </Box>

        <div className="seconde-head">
          <h3 data-aos="zoom-in" style={{ color: "white" }}>
            Revolutionizing Parking in Palestine
          </h3>
          <p
            data-aos="zoom-in"
            style={{ width: "40%", margin: "auto", color: "white" }}
          >
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
              <p data-aos="fade-down" style={{ color: "white" }}>
                Whether you're searching for parking spaces, managing your own
                garage, or both, our platform offers a seamless solution
                tailored to your needs.
              </p>
            </div>
          </div>

          <h3 data-aos="zoom-in" style={{ paddingTop: "50px", color: "white" }}>
            Why book parking?
          </h3>

          <div className="cards" data-aos="zoom-in">
            <div
              style={{
                backgroundColor: "white",
                width: "320px",
                borderRadius: "8px",
                padding: "20px",
              }}
            >
              <h3>Get closer</h3>
              <img
                src={p3}
                style={{
                  width: "150px",
                  borderRadius: "10px",
                  boxShadow: "10px 14px 14px rgba(0.1, 0.1, 0.2, 0.5)",
                  marginBottom: "20px",
                }}
              />
              <p>
                You’ll always be a stone’s throw away from where you need to be.
              </p>
            </div>
            <div
              style={{
                backgroundColor: "white",
                width: "320px",
                borderRadius: "8px",
                padding: "20px",
              }}
            >
              <h3>Park smarter</h3>
              <img
                src={p1}
                style={{
                  width: "150px",
                  borderRadius: "10px",
                  boxShadow: "10px 14px 14px rgba(0.1, 0.1, 0.2, 0.5)",
                  marginBottom: "20px",
                }}
              />
              <p>
                Save time, money & hassle by booking your space before you set
                out.
              </p>
            </div>
            <div
              style={{
                backgroundColor: "white",
                width: "320px",
                borderRadius: "8px",
                padding: "20px",
              }}
            >
              <h3>Peace of mind</h3>
              <img
                src={p2}
                style={{
                  width: "150px",
                  borderRadius: "10px",
                  boxShadow: "10px 14px 14px rgba(0.1, 0.1, 0.2, 0.5)",
                  marginBottom: "20px",
                }}
              />
              <p>
                Find the best spot, see exactly what you’re paying & even extend
                your stay - all through our award-winning app.
              </p>
            </div>
          </div>

          <div className="mock-dashbord" style={{ marginTop: "100px" }}>
            <h1 data-aos="fade-down"> Car park management DashBoard </h1>

            <img width={600} src={mock} data-aos="zoom-in" />
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Home;
