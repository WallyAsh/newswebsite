import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'; 
import '../style/signup.css';
import Navbar from './navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
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
    <div className="signup">
      <Navbar />
      <div className="signup-container">
        <h1 className="signup-title">Opprett brukerkonto</h1>
        <form className="signup-form" onSubmit={handleSignup}>
          <input type="email" placeholder="Email" required onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Passord" required onChange={e => setPassword(e.target.value)} />
          <button type="submit">Opprett</button>
        </form>
        <div className="signup-footer">
          <p>Har du allerede en brukerkonto? <Link to="/login">Logg inn</Link></p>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Brukerkonto opprettet!</p>
            <button onClick={() => setShowModal(false)}>Lukk</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
