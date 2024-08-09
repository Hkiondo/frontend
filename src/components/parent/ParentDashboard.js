import React from "react";
import {Link} from 'react-router-dom';

const ParentDashboard =() =>(
    <div>
        <h1>Parent Dashboard</h1>
        <nav>
            <Link to='/parent/children'>View Children</Link>
            <Link to='/parent/progress'>View Progress</Link>
        </nav>
    </div>
);

export default ParentDashboard;