import {
  Box, Grid, Typography,
} from "@mui/material";
import { PropsWithChildren } from "react";

interface RouteLayoutProps extends PropsWithChildren {
  buttons?: React.ReactNode;
  subtitle?: string;
  title?: string;
}

const PageLayout: React.FC<RouteLayoutProps> = ({
  buttons, children, subtitle, title,
}: RouteLayoutProps) => {
  return (
    <Box height="100%" width="100%">
      <Grid container flexDirection="column" minHeight="100%" spacing={2}>
        <Grid size="auto">
          <Grid alignItems="center" container justifyContent="space-between">
            {title?.trim() && (
              <Grid size="grow">
                <Typography component="h1" maxWidth="100%" pt={3} variant="h4">{title}</Typography>
                {subtitle !== undefined && <Typography color="primary" maxWidth="100%" variant="subtitle1">{subtitle.trim()}</Typography>}
              </Grid>
            )}
            {buttons && (
              <Grid size={!title?.trim() ? "grow" : undefined}>
                {buttons}
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid pb={9} size="grow">{children}</Grid>
      </Grid>
    </Box>
  );
};

export default PageLayout;
