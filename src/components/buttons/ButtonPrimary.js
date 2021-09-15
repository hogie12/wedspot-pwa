import React from "react";
import { Button } from "semantic-ui-react";


const ButtonPrimary = ({ width, content = "content", onClick, height, disable=false }) => (
  <Button
    style={{
      background: "#455437",
      color: "white",
      width: `${width}`,
      height: `${height}`,
    }}
    onClick={onClick}
    disable = {disable}
  >
    {content}
  </Button>
);

export default ButtonPrimary;
