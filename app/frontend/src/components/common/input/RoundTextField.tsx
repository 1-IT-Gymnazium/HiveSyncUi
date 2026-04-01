import {
  formLabelClasses,
  inputBaseClasses, outlinedInputClasses, styled, TextField,
} from "@mui/material";

const RoundTextField = styled(TextField)(({
  theme,
}) => ({
  [`.${inputBaseClasses.root}`]: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "28px",
    borderWidth: "2px",
    overflow: "hidden",
  },
  [`.${outlinedInputClasses.notchedOutline}`]: {
    borderWidth: "2px",
  },
  [`.${inputBaseClasses.sizeSmall}`]: {
    borderRadius: "20px",
  },
  [`.${formLabelClasses.root}`]: {
    backgroundColor: theme.palette.primary.dark,
    borderRadius: "20px",
    color: theme.palette.primary.contrastText,
    padding: "0.125rem 0.5rem",
    [`&.${formLabelClasses.focused}`]: {
      color: theme.palette.primary.contrastText,
    },
  },
  "& input[type=\"color\"]": {
    cursor: "pointer",
    height: "66px",
    margin: "-5px",
    padding: 0,
    width: "calc(100% + 8px)",
  },
}));

export default RoundTextField;
