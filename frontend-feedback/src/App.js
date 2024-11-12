import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import sncf from "./sncf.png";
function App() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("text", text);
    formData.append("image", image);

    try {
      await axios.post("http://11.11.0.18:5000/api/feedback", formData);
      alert("Feedback submitted!");
      setText("");
      setImage(null);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="form-container">
      <img
        style={{ position: "fixed", top: 15, right: 10 }}
        src={sncf}
        height={"70px"}
      />
      <form className="feedback-form" onSubmit={handleSubmit}>
        <textarea
          className="feedback-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your feedback"
          rows="4"
        />
        <input
          className="feedback-file-input"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button
          style={{ justifySelf: "right" }}
          className="feedback-submit-button"
          type="submit"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}

export default App;
