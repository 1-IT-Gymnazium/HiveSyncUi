import { createTheme } from "@mui/material";
import LinkBehavior from "./components/common/link/LinkBehavior";

const theme = createTheme({
  components: {
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: "#303030",
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          whiteSpace: "pre-wrap",
        },
      },
    },
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      },
    },
  },
  palette: {
    background: {
      default: "#282828",
      paper: "#303030",
    },
    divider: "rgba(251, 216, 216, 0.12)",
    error: {
      main: "#DE5A39",
    },
    info: {
      main: "#399FDE",
    },

    mode: "dark",

    primary: {
      dark: "#c6790c",
      light: "#d49f30",
      main: "#cc8613",
    },

    secondary: {
      dark: "#474747",
      light: "#a5a5a5",
      main: "#7b7b7b",
    },

    success: {
      main: "#38C53D",
    },

    text: {
      // same tone, lower emphasis handled by opacity
      disabled: "rgba(251, 216, 216, 0.5)",

      primary: "#FBD8D8",
      // main text
      secondary: "#FBD8D8",
    },

    warning: {
      main: "#FE7F00", // reuse primary as warning
    },
  },
  typography: {
    allVariants: {
      color: "#FBD8D8",
    },
  },
});
export default theme;
