import React, { useEffect, useState } from "react";
import axios from 'axios';

const ChildProgress = ({match}) => {
    const [progress, setProgress] = useState([]);

    useEffect(() => {
        axios.get(`/api/parents/child-progress/${match.params.childId}`)
            .then(response => setProgress(response.data))
            .catch(error => console.error(error));
    }, [match.params.childId]);

    return(
        <div className="container">
            <h1>Child Progress</h1>
            <ul>
                {progress.map((entry, index) =>(
                    <li key={index}>{entry.progress}</li>
                ))

                }
            </ul>
        </div>
    );
};
export default ChildProgress;