import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/home.css';
import Navbar from './navbar';
import pak2 from '../media/pak2.jpg';
import { db } from '../firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

const Home = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Query Firestore to get the latest articles
        const q = query(collection(db, "articles"), orderBy("timestamp", "desc"), limit(5));
        const querySnapshot = await getDocs(q);

        // Map the documents to article objects
        const articlesList = querySnapshot.docs.map(doc => {
          console.log(doc.data()); // Debugging: log the data to ensure we are fetching correctly
          return doc.data();
        });

        // Update the state with the fetched articles
        setArticles(articlesList);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="service-portfolio">
      <Navbar />
      <div className="container text-center text-red my-5">
        <h1 className="service-title">SISTE NYTT I PAKISTAN</h1>
        <div className="row">
          {articles.length === 0 ? (
            <p>No articles found.</p>
          ) : (
            articles.map((article, index) => (
              <div key={index} className="col-md-6 col-lg-4 mb-4">
                <div className="service-card" style={{ backgroundImage: `url(${pak2})`, opacity: '25' }}>
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
