import React from "react";

const TitleStore1 = ({ title = "title", detail = "title" }) => {
  return (
    <div
      style={{
        width: "500px",
      }}
    >
      <h3>{title}</h3>
      <p
        style={{
          fontSize: "14px",
          color: "#80848D",
        }}
      >
        {detail}
      </p>
    </div>
  );
};

export default TitleStore1;
