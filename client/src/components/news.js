import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/news.css';
import { db } from '../firebase'; // Ensure this path is correct
import { collection, getDocs } from 'firebase/firestore';
import pak1 from '../media/pak1.jpg';

const News = () => {
  const [filter, setFilter] = useState('');
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "articles"));
        const articles = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setNewsData(articles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles: ", error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const filteredNews = newsData.filter((news) =>
    news.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="service-portfolio">
      <Navbar />
      <div className="container text-center text-red my-5">
        <h1 className="service-title">NYHETER BASERT PÅ FILTER</h1>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Filtrer basert på søkeord..."
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        {loading ? (
          <p>Loading articles...</p>
        ) : (
          <div className="row">
            {filteredNews.length === 0 ? (
              <p>No articles found.</p>
            ) : (
              filteredNews.map((item, index) => (
                <div key={index} className="col-md-6 col-lg-3 mb-4">
                  <div className="service-card" style={{ backgroundImage: `url(${item.background || pak1})` }}>
                    <div className="service-card-body">
                      <h2>{item.title}</h2>
                      <p>{item.summary.substring(0, 100)}...</p>
                      <button
                        className="btn btn-primary"
                        onClick={() => alert(item.summary)}
                      >
                        Les mer
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default News;