import {
  Alert, Typography,
} from "@mui/material";

interface LocalErrorAlertProps {
  message: string;
}

const LocalErrorAlert = ({ message }: LocalErrorAlertProps) => {
  return (
    <Alert severity="error">
      <Typography variant="caption" whiteSpace="pre-wrap">
        {message}
      </Typography>
    </Alert>
  );
};

export default LocalErrorAlert;
