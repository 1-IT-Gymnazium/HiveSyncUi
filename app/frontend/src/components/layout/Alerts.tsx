import {
  Alert, Box, Snackbar, Stack, Typography,
} from "@mui/material";
import useAlertStore from "../../stores/useAlertStore";
import RoundedButton from "../common/button/RoundedButton";

const Alerts: React.FC = () => {
  const {
    alerts, removeAlert,
  } = useAlertStore();

  return (
    <Snackbar
      anchorOrigin={{
        horizontal: "center",
        vertical: "top",
      }}
      open
    >
      <Box>
        <Stack sx={{
          flexDirection: "column",
          width: "100%",
        }}
        >
          {alerts.map((alert) => (
            <Alert
              action={(
                <RoundedButton
                  onClick={() => { removeAlert(alert.id); }}
                  size="small"
                  variant={alert.persist ? "contained" : "outlined"}
                >
                  Close
                </RoundedButton>
              )}
              key={alert.id}
              severity={alert.type}
            >
              <Typography variant="caption" whiteSpace="pre-wrap">{alert.message}</Typography>
            </Alert>
          ))}
        </Stack>
      </Box>
    </Snackbar>
  );
};

export default Alerts;
