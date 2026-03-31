import {
  Box, CircularProgress, Grid, Stack, Typography,
} from "@mui/material";
import {
  useCallback, useMemo, useState,
} from "react";
import HivesyncCard from "../../layout/HivesyncCard";
import ButtonLink from "../../common/link/ButtonLink";
import paths from "../../../routes/paths";
import RoundedButton from "../../common/button/RoundedButton";
import RoundTextField from "../../common/input/RoundTextField";
import useForgottenPassword from "./hooks/useForgottenPassword";

const ForgottenPassword = () => {
  const {
    errorAlert, loading, success, sendReset,
  } = useForgottenPassword();

  const [error, setError] = useState("");

  const emailError = useMemo(() => {
    if (error) {
      return error;
    }
    const errorObject = errorAlert?.error?.serverErrors?.find((err) => err.field === "Email");
    return errorObject?.messages.join("\n");
  }, [error, errorAlert?.error?.serverErrors]);

  const onSubmit = useCallback(async (data: FormData) => {
    setError("");
    const email = data.get("email");
    if (typeof email !== "string" || !email.trim()) {
      setError("Enter your e-mail address");
      return;
    }
    if (email && (!email.includes("@") || !email.includes("."))) {
      setError("Enter a valid email address");
      return;
    }
    await sendReset({ forgotPasswordModel: { email } });
  }, [sendReset]);

  return (
    <Box alignItems="center" display="flex" justifyContent="center" minHeight="100vh" position="relative">
      <Box flex="0 1 auto" width="300px">
        <HivesyncCard
          action={onSubmit}
          actions={(
            <Stack alignItems="center" spacing={2} width="100%">
              {success === null && <RoundedButton loading={loading} type="submit" variant="contained">Send</RoundedButton>}
              <ButtonLink size="small" to={paths.login.generate()} variant="text">Log in</ButtonLink>
            </Stack>
          )}
          title="Forgotten password"
        >
          {success === null && (
            <Grid container spacing={2}>
              <Grid size={12}>
                <RoundTextField
                  disabled={loading}
                  error={!!emailError}
                  fullWidth
                  helperText={emailError}
                  label="E-mail *"
                  name="email"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          )}
          {loading && (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          )}
          {(success === true || success === false) && !loading && (
            <Typography>
              If the email is valid, you’ll receive a password reset email shortly.
            </Typography>
          )}
        </HivesyncCard>
      </Box>
    </Box>

  );
};

export default ForgottenPassword;
