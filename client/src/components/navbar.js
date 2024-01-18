import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from "firebase/auth";
import '../style/navbar.css';


function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        // Check if the logged-in user is the admin based on the UID
        if (user.uid === "NtWzmNNOeIQTRcvOfLlrs4wniCV2") {
          setIsAdmin(true);
        }
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    });
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate('/login'); 
      }, 4000); // 4 seconds until redirect/close modal
      setIsAdmin(false); // Reset admin status on sign out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="custom-navbar">
      <div className="nav-brand"> <Link to="/" className="nav-item">INSAAF NORGE</Link></div>
      <div className="nav-items">
        <Link to="/news" className="nav-item">NYHETER</Link>
        <Link to="/forum" className="nav-item">DISKUSJONSFORUM</Link>
        <Link to="/contact" className="nav-item">OM OSS</Link>
        {isAdmin && <Link to="/admin" className="nav-item">ADMIN DASHBOARD</Link>}
      </div>
      <div className="nav-items">
        {isLoggedIn ? (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <Link onClick={handleSignOut} className="nav-item" style={{cursor: 'pointer'}}>SIGN OUT</Link>
        ) : (
          <Link to="/login" className="nav-item">LOGG INN</Link>
        )}
        {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Logged Out.</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
      </div>
    </nav>
  );
}

export default Navbar;
