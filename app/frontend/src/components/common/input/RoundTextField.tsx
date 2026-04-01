import {
  inputBaseClasses, inputLabelClasses, outlinedInputClasses, styled, TextField,
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
  [`.${inputLabelClasses.root}`]: {
    backgroundColor: theme.palette.primary.dark,
    borderRadius: "20px",
    color: theme.palette.primary.contrastText,
    padding: "0.125rem 0.5rem",
    [`&.${inputLabelClasses.focused}`]: {
      color: theme.palette.primary.contrastText,
    },
    [`&.${inputLabelClasses.sizeSmall}`]: {
      fontSize: "0.9rem",
      padding: "0.0625rem 0.5rem",
      [`&.${inputLabelClasses.shrink}`]: {
        transform: "translate3D(14px, -8px, 0) scale(0.75)",
      },
    },
  },
  "& input[type=\"color\"]": {
    borderRadius: 0,
    cursor: "pointer",
    height: "66px",
    margin: "-5px",
    padding: 0,
    width: "calc(100% + 8px)",
  },
}));

export default RoundTextField;
