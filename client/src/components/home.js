import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/home.css';
import Navbar from './navbar';
import pak2 from '../media/pak2.jpg';

const Home = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('/articles_imran_khan.json')
      .then(response => response.json())
      .then(data => setArticles(data))
      .catch(error => console.error('Error fetching articles:', error));
  }, []);

  return (
    <div className="service-portfolio">
      <Navbar />
      <div className="container text-center text-red my-5">
        <h1 className="service-title">SISTE NYTT I PAKISTAN</h1>
        <div className="row">
          {articles.map((article, index) => (
            <div key={index} className="col-md-6 col-lg-4 mb-4">
              <div className="service-card" style={{ backgroundImage: `url(${pak2})` }}>
                <div className="service-card-body">
                  <h2>{article.title}</h2>
                  <p>{article.summary.substring(0, 100)}...</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => alert(article.summary)}
                  >
                    Les mer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;