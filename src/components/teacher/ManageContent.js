import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageContent = () => {
  const [content, setContent] = useState([]);
  const [newContent, setNewContent] = useState({
    title: "",
    type: "",
    content: "",
  });

  useEffect(() => {
    axios
      .get("/api/teachers/content")
      .then((response) => setContent(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/teachers/content", newContent)
      .then((response) => {
        setContent([...content, response.data]);
        setNewContent({
          title: "",
          type: "",
          content: "",
        });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container">
      <h1>Manage Content</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Title:
            <input
              type="text"
              value={newContent.title}
              onChange={(e) =>
                setNewContent({ ...newContent, title: e.target.value })
              }
              required
              style={{ marginLeft: "10px", padding: "5px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Type:
            <select
              value={newContent.type}
              onChange={(e) =>
                setNewContent({ ...newContent, type: e.target.value })
              }
              required
              style={{ marginLeft: "10px", padding: "5px" }}
            >
              <option value="">Select type</option>
              <option value="video">Video</option>
              <option value="article">Article</option>
              <option value="quiz">Quiz</option>
              <option value="exercise">Exercise</option>
            </select>
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Content:
            <textarea
              value={newContent.content}
              onChange={(e) =>
                setNewContent({ ...newContent, content: e.target.value })
              }
              required
              style={{
                marginLeft: "10px",
                padding: "5px",
                width: "100%",
                height: "100px",
              }}
            ></textarea>
          </label>
        </div>
        <button type="submit" style={{ padding: "10px 20px" }}>
          Add Content
        </button>
      </form>
      <ul>
        {content.map((item) => (
          <li key={item._id}>
            {item.title} - {item.type}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageContent;
