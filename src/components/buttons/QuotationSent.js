import React from "react";
import "./Button.css";

const QuotationSent = ({ width, content = "content", onClick }) => {
  return (
    <button
      className="pill-sent"
      style={{
        width: `${width}`,
      }}
      onClick={(event) => onClick(event)}
    >
      Quotation Sent
    </button>
  );
};

export default QuotationSent;
