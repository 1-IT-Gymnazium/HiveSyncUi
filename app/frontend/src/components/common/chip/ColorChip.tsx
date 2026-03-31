import {
  Chip, chipClasses, styled,
} from "@mui/material";

const ColorChip = styled(Chip, {
  shouldForwardProp: (propName) => ![
    "customColor",
    "fullWidth",
    "inverted",
  ].includes(propName.toString()),
})<{
  customColor?: string;
  fullWidth?: boolean;
  inverted?: boolean;
}>(({
  customColor, fullWidth, inverted, theme,
}) => {
  let color;
  if (customColor) {
    color = inverted ? customColor : theme.palette.getContrastText(customColor);
  }

  return (
    {
      boxShadow: theme.shadows[4],
      ...(customColor && {
        backgroundColor: !inverted ? `${customColor} !important` : theme.palette.background.default,
        border: inverted ? `1px solid ${customColor}` : undefined,
        color,
      }),
      ...(fullWidth && {
        width: "100%",
      }),
      [`.${chipClasses.icon}`]: {
        color,
        marginLeft: "7px",
      },
      [`.${chipClasses.label}`]: {
        marginRight: fullWidth ? "auto" : undefined,
      },
      [`.${chipClasses.deleteIcon}`]: {
        color,
      },
    });
});

export default ColorChip;
