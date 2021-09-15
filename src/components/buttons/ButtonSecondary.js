import React from "react";
import "./Button.css";

const ButtonSecondary = ({ width, content = "Content", onClick, height }) => {
  return (
    <button
      className="secondary"
      style={{
        height: `${height}`,
        width: `${width}`,
      }}
    >
      {content}
    </button>
  );
};

export default ButtonSecondary;
