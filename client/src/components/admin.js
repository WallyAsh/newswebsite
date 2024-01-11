import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { collection, getDocs } from "firebase/firestore"; 
import Navbar from './navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/admin.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user && user.uid === "NtWzmNNOeIQTRcvOfLlrs4wniCV2") {
        setUser(user);
        fetchMessages();
      } else {
        navigate('/login');
      }
    });
  }, [navigate]);

  const fetchMessages = async () => {
    const querySnapshot = await getDocs(collection(db, "messages"));
    const messagesData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setMessages(messagesData);
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <Navbar/>
      <div className="container mt-5">
        <h1 className="mb-4 text-white text-center">Admin Dashboard</h1>
        <div className="row">
          <div className="col-12">
            {messages.length > 0 ? (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Email</th>
                    <th scope="col">Message</th>
                    <th scope="col">Sent At</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map(message => (
                    <tr key={message.id}>
                      <td>{message.email}</td>
                      <td>{message.content}</td>
                      <td>{message.sentAt?.toDate().toString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="alert alert-info" role="alert">
                No messages to display.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
