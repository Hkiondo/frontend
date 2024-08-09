import React from "react";
import {Link} from 'react-router-dom';

const Navbar = () => (
    <nav>
        <Link to="/">Home</Link>
        <Link to="/lessons">Lessons</Link>
        <Link to="/activities">Activities</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/chat">Chat</Link>
        <Link to="/gamification">Gamification</Link>
        <Link to="/progress">Progress</Link>
        <Link to="/schedule">Schedule</Link>
        <Link to="/admin">Admin Panel</Link>
        <Link to="/parent">Parent Dashboard</Link>
        <Link to="/teacher">Teacher Dashboard</Link>
    </nav>
);
export default Navbar;