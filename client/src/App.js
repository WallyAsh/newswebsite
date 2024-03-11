import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 // We import all the components we need in our app
import Home from "./components/home";
import Contact from "./components/contact";
import News from "./components/news";
import Forum from "./components/forum";
import Login from "./components/login";
import Navbar from "./components/navbar";
import SignUp from "./components/signup";
import AdminDashboard from "./components/admin";



 const App = () => {
 return (
   <div>
     <Routes>
     <Route exact path="/" element={<Home/>} /> {/* Home component will only render at the root path */}
       <Route exact path="/contact" element={<Contact/>} />
       <Route path="/news" element={<News/>} />
       <Route path="/forum" element={<Forum/>} />
       <Route path="/login" element={<Login/>} />
       <Route path="/navbar" element={<Navbar/>} />
       <Route path="/signup" element={<SignUp/>} />
       <Route path="/admin" element={<AdminDashboard/>} />
     </Routes>
   </div>
 );
};
 export default App;