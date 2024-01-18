import React, { useState } from 'react';
import Navbar from './navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/forum.css';

const Forum = () => {
  const [topics, setTopics] = useState([]);
  const [filter, setFilter] = useState('');

  const handleAddTopic = (newTopic) => {
    setTopics([...topics, newTopic]);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredTopics = topics.filter((topic) =>
    topic.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="service-portfolio">
      <Navbar />
      <div className="container text-center text-white my-5">
        <h1 className="service-title">DISKUSJONSFORUM</h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            {/* Filter input */}
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Filtrer basert på søkeord brukt i forum..."
                onChange={handleFilterChange}
              />
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const newTopic = e.target.elements.topic.value;
                handleAddTopic(newTopic);
                e.target.reset();
              }}
            >
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Legg til diskusjonsforum..."
                  name="topic"
                  required
                />
                <button type="submit" className="btn btn-primary">
                  Add Topic
                </button>
              </div>
            </form>

            {/* List of forum topics */}
            <ul className="list-group">
              {filteredTopics.map((topic, index) => (
                <li key={index} className="list-group-item">
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;
