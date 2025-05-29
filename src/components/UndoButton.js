import React, { useEffect, useState } from "react";
import { GrUndo } from "react-icons/gr";

const UndoButton = ({ onUndo }) => {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <button className="inline-undo-button" onClick={onUndo}>
      <div className="progress-circle">
        <span className="countdown-text">{countdown}</span>
      </div>
      <span>UNDO</span>
      <span className="undo-icon">
        <GrUndo />
      </span>
    </button>
  );
};

export default UndoButton;
