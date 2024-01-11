import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'; 
import '../style/signup.css';
import Navbar from './navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import backgroundImg from '../media/ai.png'; 
import { Link } from 'react-router-dom';


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      // eslint-disable-next-line no-unused-vars
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // User created & signed in
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate('/contact'); 
      }, 3000); // 3 seconds until redirect/close modal
    } catch (error) {
      console.error('Error signing up:', error);
      alert(error.message);
    }
  };

  return (
    <div className="signup" style={{ backgroundImage: `url(${backgroundImg})` }}>
      <Navbar />
      <div className="signup-container">
        <h1 className="signup-title">Create Account</h1>
        <form className="signup-form" onSubmit={handleSignup}>
          <input type="email" placeholder="Email Address" required onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required onChange={e => setPassword(e.target.value)} />
          <button type="submit">Sign Up</button>
        </form>
        <div className="signup-footer">
          <p>Already have an account? <Link to="/login">Log In</Link></p>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Account created successfully!</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
