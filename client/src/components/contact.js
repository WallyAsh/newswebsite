import React, { useState, useEffect } from 'react';
import '../style/contact.css'; 
import { BsEnvelopeFill, BsTelephoneFill, BsLockFill } from 'react-icons/bs'; // Added BsLockFill for locked icon
import Navbar from './navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { auth } from '../firebase'; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { db } from '../firebase'; 
import { Link } from 'react-router-dom';


const Contact = () => {
  // State to track if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user); // !! converts truthy/falsy values to boolean true/false
    });

    // Clean up the subscription on unmount
    return unsubscribe;
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const messageContent = event.target.elements.message.value; 
    
    if (!isLoggedIn) {
      alert("You must be logged in to send a message.");
      return;
    }
  
    try {
      // Add a new document with a generated id to Firestore collection "messages"
      await addDoc(collection(db, "messages"), {
        email: auth.currentUser.email, // Get email from currently logged-in user
        content: messageContent,
        sentAt: serverTimestamp(), // Use server timestamp
      });
  
      // Clear the form or give any other indication of submission
      event.target.reset();
      alert("Message sent! We will get back to you as soon as possible, via mail to: " + auth.currentUser.email + ".");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("There was an error sending your message.");
    }
  };
  
  return (
    <div className="contact">
      <Navbar/>
      <div className="parallax-section" id="contact-section1">
        <div className="parallax-content">
          <BsEnvelopeFill size={50} className="icon" />
          <h1 className="display-3 text-with-shadow">Get in Touch</h1>
          <p className="lead text-with-shadow">
            Reach out to us with your questions, concerns, and inquiries. Our team is ready to assist you with all your needs.
          </p>
        </div>
      </div>
      <div className="parallax-section" id="contact-section2">
        <div className="parallax-content">
          <BsTelephoneFill size={50} className="icon" />
          <h1 className="display-3 text-with-shadow">Contact Form</h1>
          {isLoggedIn ? (
            <form className="contact-form" onSubmit={handleSubmit}>
              <textarea name="message" placeholder="Your Message" required></textarea>
              <button type="submit">Send Message</button>
            </form>
          ) : (
            <div className="locked-contact-form">
              <BsLockFill size={50} className="icon" />
              <p>You must be logged in to send a message.</p>
              <Link to="/login" className="login-link">Log In</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;