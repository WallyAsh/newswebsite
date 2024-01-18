import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import '../style/login.css'; 
import Navbar from './navbar';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Check if the logged-in user is the admin
      if (userCredential.user.uid === "NtWzmNNOeIQTRcvOfLlrs4wniCV2") {
        // User is admin, redirect to admin dashboard
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          navigate('/admin');
        }, 2000); // 2 seconds until redirect/close modal
      } else {
        // User is not admin, redirect to contact page or other user-specific page
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          navigate('/contact');
        }, 2000); // 2 seconds until redirect/close modal
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="login">
      <Navbar/>
      <div className="login-container">
        <h1 className="login-title">Velkommen tilbake!</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <input type="email" placeholder="Email" required onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Passord" required onChange={e => setPassword(e.target.value)} />
          <button type="submit">Logg inn</button>
        </form>
        <div className="login-footer">
          <p>Ny på Insaaf? <Link to="/signup">Opprett brukerkonto</Link></p>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Logg inn sukessfull!</p>
            <button onClick={() => setShowModal(false)}>Lukk</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
