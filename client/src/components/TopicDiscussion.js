import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const TopicDiscussion = () => {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const docRef = doc(db, 'forumTopics', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTopic(docSnap.data());
        } else {
          console.log('No such document!');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching topic:', error);
        setLoading(false);
      }
    };

    fetchTopic();
  }, [id]);

  if (loading) {
    return <p>Loading topic...</p>;
  }

  if (!topic) {
    return <p>Topic not found</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h1>{topic.header}</h1>
        <p>{topic.description}</p>
        <p><strong>Created at:</strong> {topic.createdAt.toDate().toLocaleString()}</p>
      </div>
    </div>
  );
};

export default TopicDiscussion;
