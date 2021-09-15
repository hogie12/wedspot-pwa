import React from "react";
import "./Button.css";

import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

const ButtonPhoto = ({ width, content = "Add Photo", height }) => {
  return (
    <div
      className="secondary"
      style={{
        height: `${height}`,
        width: `${width}`,
        display: "flex",
        alignItems: "center",
        background: "#ffffff",
      }}
    >
      <AddAPhotoIcon style={{ marginRight: "1rem" }} />
      {content}
    </div>
  );
};

export default ButtonPhoto;
