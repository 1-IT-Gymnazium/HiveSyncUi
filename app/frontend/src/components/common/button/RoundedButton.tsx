import {
  Button, buttonClasses, styled,
} from "@mui/material";

const RoundedButton = styled(Button)(() => ({
  borderRadius: "50px !important",
  display: "block",
  fontSize: "0.75rem",
  lineHeight: 1,
  overflow: "hidden !important",
  padding: "0.75rem",
  [`&.${buttonClasses.sizeSmall}`]: {
    padding: "0.5rem",
  },
}));

export default RoundedButton;
