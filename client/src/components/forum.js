import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/forum.css';
import { collection, addDoc, getDocs, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Collapse } from 'react-bootstrap';

const Forum = () => {
  const [topics, setTopics] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newTopicHeader, setNewTopicHeader] = useState('');
  const [newTopicDescription, setNewTopicDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'forumTopics'));
        const topicsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTopics(topicsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching topics:', error);
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchTopics();
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddTopic = async () => {
    if (!user) {
      alert('You must be logged in to add a topic.');
      return;
    }

    const newTopic = {
      header: newTopicHeader,
      description: newTopicDescription,
      createdAt: Timestamp.now()
    };

    try {
      const docRef = await addDoc(collection(db, 'forumTopics'), newTopic);
      setTopics([...topics, { id: docRef.id, ...newTopic }]);
      setShowForm(false);
      setNewTopicHeader('');
      setNewTopicDescription('');
    } catch (error) {
      console.error('Error adding topic:', error);
    }
  };

  const handleDeleteTopic = async (id) => {
    try {
      await deleteDoc(doc(db, 'forumTopics', id));
      setTopics(topics.filter(topic => topic.id !== id));
    } catch (error) {
      console.error('Error deleting topic:', error);
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleTopicClick = (id) => {
    navigate(`/topic/${id}`);
  };

  const filteredTopics = topics.filter((topic) =>
    topic.header.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    /*
      <div className="container">
        <div className="row mb-3">
          <div className="col-md-8 offset-md-2 d-flex justify-content-between align-items-center">
            <input
              type="text"
              className="form-control"
              placeholder="Filtrer basert på søkeord brukt i forum..."
              onChange={handleFilterChange}
            />
            <Button variant="primary" onClick={() => setShowForm(!showForm)} className="ms-3">
              {showForm ? 'Cancel' : 'Add Topic'}
            </Button>
          </div>
        </div>

        <Collapse in={showForm}>
          <div className="row mb-3">
            <div className="col-md-8 offset-md-2">
              <Form>
                <Form.Group className="mb-3" controlId="topicHeader">
                  <Form.Label>Header</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter topic header"
                    value={newTopicHeader}
                    onChange={(e) => setNewTopicHeader(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="topicDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter topic description"
                    value={newTopicDescription}
                    onChange={(e) => setNewTopicDescription(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" onClick={handleAddTopic}>
                  Add Topic
                </Button>
              </Form>
            </div>
          </div>
        </Collapse>

        {loading ? (
          <p>Loading topics...</p>
        ) : (
          <ul className="list-group">
            {filteredTopics.length > 0 ? (
              filteredTopics.map((topic) => (
                <li key={topic.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <span onClick={() => handleTopicClick(topic.id)} style={{ cursor: 'pointer' }}>
                    {topic.header} - {topic.createdAt.toDate().toLocaleString()}
                  </span>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteTopic(topic.id)}>
                    Delete
                  </button>
                </li>
              ))
            ) : (
              <li className="list-group-item">No topics found</li>
            )}
          </ul>
        )}
      </div>
    </div>
    */
    <div className="service-portfolio">
      <Navbar/>
      <div className="container text-center text-white my-5">
        <h1 className="service-title">DISKUSJONSFORUM KOMMER SNART!</h1>
      </div>
    </div>
  );
};

export default Forum;
