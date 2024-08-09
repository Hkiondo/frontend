import React, { useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";
// import { useJwt } from "react-jwt";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { UserProvider } from "./context/UserContext";
import Navbar from "./components/Navbar";
import RouteTrees from "./components/Routing/RoutTrees";
import InitialTree from "./components/Routing/InitialTree";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
// import { useState } from "react";
// import Lessons from "./components/Lessons";
// import Activities from "./components/Activity";
// import UserProfile from "./components/UserProfile";
// import Chat from "./components/Chat";
// import Gamification from "./components/Gamification";
// import ProgressDashboard from "./components/ProgressDashboard";
// import Schedule from "./components/Schedule";
// import AdminPanel from "./components/admin/AdminPanel";
// import UserManagement from "./components/admin/UserManagement";
// import ContentManagement from "./components/admin/ContentManagement";
// import ParentDashboard from "./components/parent/ParentDashboard";
// import ChildProgress from "./components/parent/ChildProgress";
// import TeacherDashboard from "./components/teacher/TeacherDashboard";
// import StudentProgress from "./components/teacher/StudentProgress";
// import ManageContent from "./components/teacher/ManageContent";
// import "./styles.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const storedToken = localStorage.getItem("token");
  useEffect(() => {
    setToken(storedToken);
    // setLoggedIn(true);
    if (storedToken) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [token]);
  // <UserProvider>
  // <Router>

  // console.log(decodedToken, isExpired);
  // const { role } = decodedToken ||;
  // console.log(role);
  // const decoded = jwtDecode(token);
  // console.log(decoded);
  return loggedIn ? (
    <RouteTrees setLoggedIn={setLoggedIn} />
  ) : (
    <InitialTree setLoggedIn={setLoggedIn} />
  );
  // <>
  //   {/* <Navbar /> */}
  //   {/* <Register />
  //   <Login /> */}
  //   <RouteTrees />

  //   {/* <RouteTrees /> */}
  // </>
  // </Router>
}
export default App;
