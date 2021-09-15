import React from "react";
import Phone from "../../assets/NoPhone.png";

const NoresultPhone = ({
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
        src={Phone}
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

export default NoresultPhone;
