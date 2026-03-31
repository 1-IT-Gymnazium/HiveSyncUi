import {
  styled, ToggleButtonGroup, toggleButtonGroupClasses,
} from "@mui/material";

const RoundedToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  borderRadius: "25px",
  boxShadow: theme.shadows[5],
  overflow: "hidden",
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    padding: "0.3rem 0.6rem",
  },
  [`& .${toggleButtonGroupClasses.grouped}.${toggleButtonGroupClasses.selected}`]: {
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    "backgroundColor": theme.palette.primary.main,
    "color": theme.palette.primary.contrastText,
  },
  [`& .${toggleButtonGroupClasses.firstButton}`]: {
    borderBottomLeftRadius: "25px",
    borderTopLeftRadius: "25px",
  },
  [`& .${toggleButtonGroupClasses.lastButton}`]: {
    borderBottomRightRadius: "25px",
    borderTopRightRadius: "25px",
  },
}));

export default RoundedToggleButtonGroup;
