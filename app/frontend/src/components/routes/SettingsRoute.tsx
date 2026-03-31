import {
  useCallback, useLayoutEffect,
} from "react";
import {
  Avatar, Card, CardHeader, Grid, IconButton,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import useDocumentMeta from "../../context/documentMeta/useDocumentMeta";
import Settings from "../pages/settings/Settings";
import useUserStore from "../../stores/useUserStore";
import useLogout from "../layout/hooks/useLogout";

const SettingsRoute = () => {
  const { setSectionName } = useDocumentMeta();
  const userDetail = useUserStore((state) => state.userDetail);
  const {
    logout,
  } = useLogout();

  useLayoutEffect(() => {
    setSectionName("Settings");

    return () => {
      setSectionName(null);
    };
  }, [setSectionName]);

  const initials = userDetail?.name?.trim()
    ? userDetail.name.trim().split(" ")
      .map((p) => p.charAt(0))
      .join("")
    : null;

  const handleLogoutClick = useCallback(async () => {
    const loggedOut = await logout();
    if (loggedOut) {
      window.location.reload();
    }
  }, [logout]);

  return (
    <Grid container direction="column" height="100%">
      <Grid flexShrink={0} minHeight={0} overflow="auto" size="grow">
        <Settings />
      </Grid>
      <Grid size="auto">
        <Card>
          <CardHeader
            action={(
              <IconButton aria-label="settings" onClick={handleLogoutClick}>
                <Logout />
              </IconButton>
            )}
            avatar={
              initials && (
                <Avatar>
                  {initials}
                </Avatar>
              )
            }
            title={userDetail?.name}
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default SettingsRoute;
