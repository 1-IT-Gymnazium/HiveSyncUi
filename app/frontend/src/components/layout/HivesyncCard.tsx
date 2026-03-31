import {
  Box,
  Card, CardActions, CardContent, CardProps,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import {
  forwardRef,
  ReactNode,
  SubmitEventHandler,
} from "react";
import Logo from "../../assets/logo/logo-icon.svg?react";

interface HivesyncCardProps extends Omit<CardProps, "onSubmit"> {
  action?: (formData: FormData) => unknown;
  actions?: ReactNode;
  onSubmit?: SubmitEventHandler<HTMLFormElement>;
  largeTitle?: boolean;
  title?: string;
}

const HivesyncCard = forwardRef<HTMLFormElement, HivesyncCardProps>(({
  action, actions, children, largeTitle: large, title, ...rest
}: HivesyncCardProps, ref: React.Ref<HTMLFormElement>) => {
  return (
    <Box position="relative">
      <SvgIcon
        component={Logo}
        inheritViewBox
        sx={{
          fontSize: "7rem",
          position: "absolute",
          right: "-1.9rem",
          top: "-2.5rem",
        }}
      />
      <Card
        action={action}
        component="form"
        ref={ref}
        sx={(theme) => ({
          backgroundColor: theme.palette.grey[900],
          boxShadow: theme.shadows[7],
        })}
        {...rest}
      >
        <CardContent>
          <Stack direction="row" pr={4} zIndex={1}>
            <Typography component="h1" variant={large ? "h3" : "h4"}>{title ?? "HiveSync"}</Typography>
          </Stack>
          <Box pb={1} pt={2} px={1}>
            {children}
          </Box>
        </CardContent>
        {actions && (
          <CardActions sx={{ textAlign: "center" }}>
            {actions}
          </CardActions>
        )}
      </Card>
    </Box>
  );
});

HivesyncCard.displayName = "HivesyncCard";

export default HivesyncCard;
