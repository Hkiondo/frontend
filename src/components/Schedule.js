import React from "react";

const Schedule =({timetable}) => (
    <div className="container">        {timetable.map((event, index) =>(
            <div key={index}>
            <p>{event.time} - {event.activity}</p>
            </div>
        ))}
    </div>
      
);

export default Schedule;