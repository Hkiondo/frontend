import React, { useEffect, useState } from "react";
import axios from 'axios';

const StudentProgress = ({match}) => {
    const [progress, setProgress] = useState([]);

    useEffect(() => {
        axios.get(`/api/teachers/student-progress/${match.params.studentId}`)
            .then(response => setProgress(response.data))
            .catch(error => console.error(error));
    }, [match.params.studentId]);

    return(
        <div className="container">
            <h1>Student Progress</h1>
            <ul>
                {progress.map((entry, index) => (
                    <li>{entry.progress}</li>
                ))}
            </ul>
        </div>
    );
};

export default StudentProgress;