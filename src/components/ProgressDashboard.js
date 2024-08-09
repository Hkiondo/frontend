import React, { useEffect, useState } from "react";
import {Line} from 'react-chartjs-2';

const ProgressDashboard = () =>{
    const [progressData, setProgressData] = useState({});

    useEffect(() => {
        //Fetch the progres data from the backendd
        setProgressData({
            labels: ['Week 1', 'Week 2', 'Week 3'],
            datasets: [
               {
                label: 'Progress',
                data: [65, 59, 80],
               },
            ],
        });
    },[]);

    return(
        <div className="container">
            <h2>Student Progress</h2>
            <Line data={progressData}/>
        </div>
    );
};

export default ProgressDashboard;