import {
  styled, Tooltip, tooltipClasses, TooltipProps,
} from "@mui/material";

const RoundedTooltip = styled(({
  className, ...props
}: TooltipProps) => (
  <Tooltip
    {...props}
    classes={{ popper: className }}
    slotProps={{
      ...props.slotProps,
      popper: {
        modifiers: [{
          name: "offset",
          options: {
            offset: [0, -14],
          },
        }],
      },
    }}
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.primary.dark,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.grey[900],
    border: `1px solid ${theme.palette.primary.dark}`,
    borderRadius: "18px",
    fontSize: "0.75rem",
    padding: "4px 8px",
  },
}));

export default RoundedTooltip;
