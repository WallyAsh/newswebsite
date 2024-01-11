import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/home.css';
import HomeVid from '../media/homevid.mov';
import Navbar from './navbar';
import pmBackground from '../media/pm.png';
import aiBackground from '../media/ai.png';
import cyberBackground from '../media/cyber.png';
import seoBackground from '../media/seo.png';

const Home = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.4; 
    }
  }, []);

  return (
    <div className="service-portfolio">
      <Navbar/>
      <div className="container text-center text-red my-5">
        <h1 className="service-title"> SISTE NYTT I PAKISTAN</h1>
        <p className="service-subtitle"> </p>
        <div className="row">
          <div className="col-md-6 col-lg-3 mb-4">
            <div className="service-card" style={{ backgroundImage: `url(${pmBackground})` }}>
              <div className="service-card-body">
                <h2 >Project Management</h2>
                <p>Embark on a journey of streamlined efficiency with our advanced project management tools and expertise. Transform your strategic vision into exemplary executions.</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3 mb-4">
            <div className="service-card" style={{ backgroundImage: `url(${aiBackground})` }}>
              <div className="service-card-body">
                <h2>Artificial Intelligence</h2>
                <p>Revolutionize your business with our AI-driven solutions to automate processes, glean insights from data, and create an ecosystem of smart operations tailored to your needs.</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3 mb-4">
            <div className="service-card" style={{ backgroundImage: `url(${cyberBackground})` }}>
              <div className="service-card-body">
                <h2>Cybersecurity</h2>
                <p>Fortify your digital landscape with our comprehensive cybersecurity protocols. Ensure your data's integrity and your infrastructures' resilience from threats.</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3 mb-4">
            <div className="service-card" style={{ backgroundImage: `url(${seoBackground})` }}>
              <div className="service-card-body">
                <h2>Websites & SEO</h2>
                <p>Enhance your online presence with our bespoke web and SEO strategies that amplify visibility, drive engagement, and convert traffic into loyal customers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
