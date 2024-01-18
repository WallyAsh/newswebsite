import React, { useState } from 'react';
import Navbar from './navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/news.css';
import pak1 from '../media/pak1.jpg';
import pak2 from '../media/pak2.jpg';

const News = () => {
  const [filter, setFilter] = useState('');

  const newsData = [
    {
      title: 'Imran Khan',
      content: 'Embark on a journey of streamlined efficiency with our advanced project management tools and expertise. Transform your strategic vision into exemplary executions.',
      background: pak1,
    },
    {
      title: 'Pakistan Cricket',
      content: 'Revolutionize your business with our AI-driven solutions to automate processes, glean insights from data, and create an ecosystem of smart operations tailored to your needs.',
      background: pak2,
    },
    {
      title: 'Bhera',
      content: 'Fortify your digital landscape with our comprehensive cybersecurity protocols. Ensure your data\'s integrity and your infrastructures\' resilience from threats.',
      background: pak1,
    },
    // Add more news items as needed
    {
      title: 'Bhera 2',
      content: 'Fortify your digital landscape with our comprehensive cybersecurity protocols. Ensure your data\'s integrity and your infrastructures\' resilience from threats.',
      background: pak2,
    },
    {
      title: 'Bhera 3',
      content: 'Fortify your digital landscape with our comprehensive cybersecurity protocols. Ensure your data\'s integrity and your infrastructures\' resilience from threats.',
      background: pak1,
    },
  ];

  const filteredNews = newsData.filter((news) =>
    news.title.toLowerCase().includes(filter.toLowerCase())  );

  return (
    <div className="service-portfolio">
      <Navbar />
      <div className="container text-center text-red my-5">
        <h1 className="service-title"> NYHTER BASERT PÅ FILTER</h1>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Filtrer basert på søkeord..."
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="row">
          {filteredNews.map((item, index) => (
            <div key={index} className="col-md-6 col-lg-3 mb-4">
              <div className="service-card" style={{ backgroundImage: `url(${item.background})` }}>
                <div className="service-card-body">
                  <h2>{item.title}</h2>
                  <p>{item.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
