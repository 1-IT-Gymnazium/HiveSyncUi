import {
  inputBaseClasses, outlinedInputClasses, styled, TextField,
} from "@mui/material";

const RoundTextField = styled(TextField)(({ theme }) => ({
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
}));

export default RoundTextField;
