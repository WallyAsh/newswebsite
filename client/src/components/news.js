import React from 'react';
import '../style/news.css'; 
import { BsFillBriefcaseFill, BsFillPeopleFill, BsTrophy } from 'react-icons/bs'; 
import Navbar from './navbar';

const News = () => {
  return (
    <div className="about">
      <Navbar/>
      <div className="parallax-section" id="section1">
        <div className="parallax-content">
          <BsFillBriefcaseFill size={50} className="icon" />
          <h1 className="display-3 text-with-shadow">Decade of Expertise</h1>
          <p className="lead text-with-shadow"> Founded in the early days of the digital revolution, Manage IT has a rich history of pioneering innovative IT solutions. Our extensive experience is the bedrock upon which we build success for our clients.</p>
        </div>
      </div>
      <div className="parallax-section" id="section2">
        <div className="parallax-content">
          <BsFillPeopleFill size={50} className="icon" />
          <h1 className="display-3 text-with-shadow">Trusted by Industry Leaders</h1>
          <p className="lead text-with-shadow">Our reputation as project leaders has been cemented through partnerships with major Norwegian companies. Our commitment to excellence is recognized across the industry.</p>
        </div>
      </div>
      <div className="parallax-section" id="section3">
        <div className="parallax-content">
          <BsTrophy size={50} className="icon" />
          <h1 className="display-3 text-with-shadow">Commitment to Success</h1>
          <p className="lead text-with-shadow">We believe in creating value and delivering excellence. Our team's dedication to driving success has made us a beacon of innovation in IT consultancy.</p>
        </div>
      </div>
    </div>
  );
};

export default News;
