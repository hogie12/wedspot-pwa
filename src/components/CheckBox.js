import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { grey } from "@material-ui/core/colors";

const CheckboxIcon = withStyles({
  root: {
    color: grey[500],
    "&$checked": {
      color: grey[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);
const CheckBox = () => {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedC: true,
    checkedD: true,
    checkedE: true,
    checkedF: true,
    checkedG: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div>
      <FormControlLabel
        control={
          <CheckboxIcon
            checked={state.checkedA}
            onChange={handleChange}
            name="checkedA"
          />
        }
        label="All categories"
      />
      <FormControlLabel
        control={
          <CheckboxIcon
            checked={state.checkedB}
            onChange={handleChange}
            name="checkedB"
          />
        }
        label="Boutonnieres & Corsages"
      />
      <FormControlLabel
        control={
          <CheckboxIcon
            checked={state.checkedC}
            onChange={handleChange}
            name="checkedC"
          />
        }
        label="Bridal"
      />
      <FormControlLabel
        control={
          <CheckboxIcon
            checked={state.checkedD}
            onChange={handleChange}
            name="checkedD"
          />
        }
        label="Catering"
      />
      <FormControlLabel
        control={
          <CheckboxIcon
            checked={state.checkedE}
            onChange={handleChange}
            name="checkedE"
          />
        }
        label="Dance & Choreography"
      />
      <FormControlLabel
        control={
          <CheckboxIcon
            checked={state.checkedF}
            onChange={handleChange}
            name="checkedF"
          />
        }
        label="Decoration & Lighting"
      />
      <FormControlLabel
        control={
          <CheckboxIcon
            checked={state.checkedG}
            onChange={handleChange}
            name="checkedG"
          />
        }
        label="Dress & Attire"
      />
    </div>
  );
};

export default CheckBox;
