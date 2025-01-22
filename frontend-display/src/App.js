// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import "./App.css";

// const socket = io("http://172.20.10.11:5000", {
//   transports: ["websocket"], // Use websocket transport
// });

// const sizes = ["small", "medium", "large"];

// function App() {
//   const [feedbackQueue, setFeedbackQueue] = useState([]);

//   useEffect(() => {
//     socket.on("newFeedback", (data) => {
//       setFeedbackQueue((prevQueue) => [data, ...prevQueue].slice(0, 12)); // Keep only the latest 12
//     });

//     return () => socket.off("newFeedback");
//   }, []);
//   console.log(feedbackQueue);
//   return (
//     <div className="feedback-container12">
//       <div className="feedback-container1">
//         {feedbackQueue.map((feedback, index) => (
//           <div key={index} className="feedback-container">
//             <div className="feedback-card">
//               <div className="feedback-card-img">
//                 {feedback.imageUrl && (
//                   <img
//                     className="feedback-image"
//                     src={`http://172.20.10.11:5000${feedback.imageUrl}`}
//                     alt="Feedback"
//                   />
//                 )}
//               </div>
//               <div className="feedback-card-comment">
//                 <p className="feedback-text">{feedback.text}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";
import satguru from "./satguru.jpg"; // Static image for the middle highlight card

const socket = io("http://192.168.68.102:5000", {
  transports: ["websocket"], // Use websocket transport
});

function App() {
  const [feedbackQueue, setFeedbackQueue] = useState([]);

  useEffect(() => {
    socket.on("newFeedback", (data) => {
      setFeedbackQueue((prevQueue) => [data, ...prevQueue]); // Keep only the latest 12
    });

    return () => socket.off("newFeedback");
  }, []);
  console.log(feedbackQueue);

  return (
    <div className="feedback-container12">
      <div className="feedback-outer">
        {/* Left section with feedback cards from queue */}
        <div className="feedback-left">
          {feedbackQueue.slice(0, 3).map((feedback, index) => (
            <div key={index} className="feedback-card">
              <div className="feedback-card-img">
                <img
                  className="feedback-image"
                  src={`http://192.168.68.102:5000${feedback.imageUrl}`}
                  alt="Feedback"
                />
              </div>
              <div className="feedback-card-comment">
                <p className="feedback-text">{feedback.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Middle section with static highlighted feedback card */}
        <div className="feedback-middle">
          <div className="feedback-mid-top">
            {feedbackQueue.slice(3, 5).map((feedback, index) => (
              <div key={index} className="feedback-card">
                <div className="feedback-card-img">
                  <img
                    className="feedback-image"
                    src={`http://192.168.68.102:5000${feedback.imageUrl}`}
                    alt="Feedback"
                  />
                </div>
                <div className="feedback-card-comment">
                  <p className="feedback-text">{feedback.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Static highlight feedback card */}
          <div className="feedback-mid-highlight">
            <div
              style={{ width: "1800px" }}
              className="feedback-card-highlight"
            >
              <div className="feedback-card-highlight-img">
                <div className="feedback-highlight-img-outer">
                  <img
                    className="feedback-image"
                    src={satguru}
                    alt="Feedback"
                  />
                </div>
              </div>
              <div className="feedback-card-highlight-comment">
                <p
                  style={{ fontSize: "62px" }}
                  className="feedback-highlight-text"
                >
                  May Nirankar Bless all to serve With humility
                </p>
              </div>
            </div>
          </div>

          <div className="feedback-mid-bottom">
            {feedbackQueue.slice(5, 7).map((feedback, index) => (
              <div key={index} className="feedback-card">
                <div className="feedback-card-img">
                  <img
                    className="feedback-image"
                    src={`http://192.168.68.102:5000${feedback.imageUrl}`}
                    alt="Feedback"
                  />
                </div>
                <div className="feedback-card-comment">
                  <p className="feedback-text">{feedback.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Right section with three feedback cards from queue */}
        <div className="feedback-right">
          {feedbackQueue.slice(7, 10).map((feedback, index) => (
            <div key={index} className="feedback-card">
              <div className="feedback-card-img">
                <img
                  className="feedback-image"
                  src={`http://192.168.68.102:5000${feedback.imageUrl}`}
                  alt="Feedback"
                />
              </div>
              <div className="feedback-card-comment">
                <p className="feedback-text">{feedback.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
