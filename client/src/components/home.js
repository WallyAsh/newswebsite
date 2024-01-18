import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/home.css';
import Navbar from './navbar';
import pak1 from '../media/pak1.jpg';
import pak2 from '../media/pak2.jpg';


const Home = () => {

  return (
    <div className="service-portfolio">
      <Navbar/>
      <div className="container text-center text-red my-5">
        <h1 className="service-title"> SISTE NYTT I PAKISTAN</h1>
        <p className="service-subtitle"> </p>
        <div className="row">
        <div className="col-md-1 col-lg-12 mb-5">
            <div className="service-card" style={{ backgroundImage: `url(${pak1})` }}>
              <div className="service-card-body">
                <h2 >STORE NYHETER</h2>
                <p>Slideshow med siste store nyheter</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3 mb-4">
            <div className="service-card" style={{ backgroundImage: `url(${pak2})` }}>
              <div className="service-card-body">
                <h2 >Imran Khan</h2>
                <p>Embark on a journey of streamlined efficiency with our advanced project management tools and expertise. Transform your strategic vision into exemplary executions.</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3 mb-4">
            <div className="service-card" style={{ backgroundImage: `url(${pak2})` }}>
              <div className="service-card-body">
                <h2>Pakistan Cricket</h2>
                <p>Revolutionize your business with our AI-driven solutions to automate processes, glean insights from data, and create an ecosystem of smart operations tailored to your needs.</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3 mb-4">
            <div className="service-card" style={{ backgroundImage: `url(${pak2})` }}>
              <div className="service-card-body">
                <h2>Bhera</h2>
                <p>Fortify your digital landscape with our comprehensive cybersecurity protocols. Ensure your data's integrity and your infrastructures' resilience from threats.</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3 mb-4">
            <div className="service-card" style={{ backgroundImage: `url(${pak2})` }}>
              <div className="service-card-body">
                <h2>Lahore</h2>
                <p>Enhance your online presence with our bespoke web and SEO strategies that amplify visibility, drive engagement, and convert traffic into loyal customers.</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3 mb-4">
            <div className="service-card" style={{ backgroundImage: `url(${pak2})` }}>
              <div className="service-card-body">
                <h2>Islamabad</h2>
                <p>Enhance your online presence with our bespoke web and SEO strategies that amplify visibility, drive engagement, and convert traffic into loyal customers.</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3 mb-4">
            <div className="service-card" style={{ backgroundImage: `url(${pak2})` }}>
              <div className="service-card-body">
                <h2>Karachi</h2>
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
