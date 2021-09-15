import React from "react";
import "./Button.css";

const QuotationNew = ({ width, content = "content", onClick }) => {
  return (
    <button
      className="pill-new"
      style={{
        width: `${width}`,
      }}
      onClick={(event) => onClick(event)}
    >
      New
    </button>
  );
};

export default QuotationNew;
