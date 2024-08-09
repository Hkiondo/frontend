import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Gamification() {
  const location = useLocation();
  const studentID = location.pathname.split("/")[3];
  const [scores, setScores] = useState({ week1: 0, week2: 0, week3: 0 });
  const [gamification, setGamification] = useState({
    week1: { points: 0, message: "" },
    week2: { points: 0, message: "" },
    week3: { points: 0, message: "" },
  });

  useEffect(() => {
    async function getStudentScores() {
      try {
        const result = await axios.get(
          `http://localhost:4000/api/teacher/get-student/${studentID}`
        );
        const scores = result.data.scores;
        setScores({
          week1: scores["Week 1"] || 0,
          week2: scores["Week 2"] || 0,
          week3: scores["Week 3"] || 0,
        });
      } catch (error) {
        console.error("Error getting student details", error);
      }
    }

    getStudentScores();
  }, [studentID]);

  useEffect(() => {
    calculateGamification(scores);
  }, [scores]);

  function calculateGamification(scores) {
    const weeks = ["week1", "week2", "week3"];
    const newGamification = {};

    weeks.forEach((week) => {
      const score = scores[week];
      let points = 0;
      let message = "";

      if (score >= 100) {
        points = 10;
        message = "You are a champion!";
      } else if (score >= 80) {
        points = 8;
        message = "We are cruising good dinosaur!";
      } else if (score >= 60) {
        points = 5;
        message = "Oh oh, we need to improve!";
      } else {
        points = 1;
        message = "We are in trouble dinosaur!";
      }

      newGamification[week] = { points, message };
    });

    setGamification(newGamification);
  }

  return (
    <div>
      <h1>Student Dashboard</h1>
      <div>
        <h2>Week 1</h2>
        <p>Score: {scores.week1}</p>
        <p>Points: {gamification.week1.points}</p>
        <p>{gamification.week1.message}</p>
      </div>
      <div>
        <h2>Week 2</h2>
        <p>Score: {scores.week2}</p>
        <p>Points: {gamification.week2.points}</p>
        <p>{gamification.week2.message}</p>
      </div>
      <div>
        <h2>Week 3</h2>
        <p>Score: {scores.week3}</p>
        <p>Points: {gamification.week3.points}</p>
        <p>{gamification.week3.message}</p>
      </div>
    </div>
  );
}

export default Gamification;
