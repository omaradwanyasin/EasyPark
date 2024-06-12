import React from 'react';
import "./homePageIntro.css";
import img from './img.png';

function HomePageIntro() {
  return (
    <div className="homePageContainer" data-aos="zoom-in">
      <div className="img">
        <img src={img} alt="Illustration of booking parking space" />
      </div>
      <div className="text-section">
        <div className="title">
          <h1>
            Guarantee your space <span>before you set off.</span>
          </h1>
        </div>
        <div className="parag">
          <p>
            Our huge network of bookable parking spaces & driveways gets you closer to where you need to be. By reserving your parking, you’ll save time & money on all your journeys, whether it’s your daily commute, an evening gig or a weekend away.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePageIntro;
