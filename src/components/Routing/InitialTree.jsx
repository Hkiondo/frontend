import { Routes, Route } from "react-router-dom";
import Register from "../Register";
import Login from "../Login";

function InitialTree({ setLoggedIn }) {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Login setLoggedIn={setLoggedIn} />} />
    </Routes>
  );
}

export default InitialTree;
