import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

const socket = io("http://11.11.0.18:5000", {
  transports: ["websocket"], // Use websocket transport
});

const sizes = ["small", "medium", "large"];

function App() {
  const [feedbackQueue, setFeedbackQueue] = useState([]);

  useEffect(() => {
    socket.on("newFeedback", (data) => {
      setFeedbackQueue((prevQueue) => [data, ...prevQueue].slice(0, 12)); // Keep only the latest 12
    });

    return () => socket.off("newFeedback");
  }, []);

  return (
    <div className="feedback-container">
      {feedbackQueue.map((feedback, index) => (
        <div
          className={`feedback-card ${sizes[index % sizes.length]}`}
          key={index}
        >
          <div className="feedback-card-content">
            <p className="feedback-text">{feedback.text}</p>
            {feedback.imageUrl && (
              <img
                className="feedback-image"
                src={`http://11.11.0.18:5000${feedback.imageUrl}`}
                alt="Feedback"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
