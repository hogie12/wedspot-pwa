import React from "react";
import Hand from "../../assets/NoHand.png";

const NoresultHand = ({
  title = "No Result Title",
  description = "Please Try",
}) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img
        src={Hand}
        alt="No Result"
        style={{
          width: "320px",
          margin: "24px",
        }}
      ></img>
      <h3 style={{ fontSize: "16px", margin: "4px", fontWeight: 600 }}>
        {title}
      </h3>
      <p style={{ fontSize: "16px", margin: "4px" }}>{description}</p>
    </div>
  );
};

export default NoresultHand;
