import {
  Grid, Typography,
} from "@mui/material";
import { PropsWithChildren } from "react";

interface RouteLayoutProps extends PropsWithChildren {
  buttons?: React.ReactNode;
  padBottom?: boolean;
  subtitle?: string;
  title?: string;
}

const PageLayout: React.FC<RouteLayoutProps> = ({
  buttons, children, padBottom, subtitle, title,
}: RouteLayoutProps) => {
  return (
    <Grid container flexDirection="column" gap={2} minHeight="100%">
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
      <Grid flexShrink="0" pb={padBottom ? 9 : undefined} size="grow">{children}</Grid>
    </Grid>
  );
};

export default PageLayout;
