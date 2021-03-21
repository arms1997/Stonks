import { Button } from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";

const StyledButton = withStyles((theme) => ({
  root: {
    color: "white",
    backgroundColor: "#aebdb8",
    "&:hover": {
      backgroundColor: "#4c5663",
    },
  },
}))(Button);

export default function CustomButton(props) {
  return <StyledButton {...props}></StyledButton>;
}
