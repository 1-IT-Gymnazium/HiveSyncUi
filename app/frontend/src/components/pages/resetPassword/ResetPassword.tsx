import {
  Box, CircularProgress, Grid, Stack,
  Typography,
} from "@mui/material";
import { useSearchParams } from "react-router";
import {
  useCallback, useMemo, useState,
} from "react";
import HivesyncCard from "../../layout/HivesyncCard";
import ButtonLink from "../../common/link/ButtonLink";
import paths from "../../../routes/paths";
import LocalErrorAlert from "../../common/alert/LocalErrorAlert";
import RoundedButton from "../../common/button/RoundedButton";
import RoundTextField from "../../common/input/RoundTextField";
import useResetPassword from "./hooks/useResetPassword";

const ResetPassword = () => {
  const [urlSearchParams] = useSearchParams();
  const {
    errorAlert, loading, success, resetPassword, resendEmail,
  } = useResetPassword();

  const [error, setError] = useState("");

  const email = urlSearchParams.get("email");
  const token = urlSearchParams.get("token");

  const passwordError = useMemo(() => {
    if (error) {
      return error;
    }
    const errorObject = errorAlert?.error?.serverErrors?.find((err) => err.field === "NewPassword");
    return errorObject?.messages.join("\n");
  }, [error, errorAlert?.error?.serverErrors]);

  const tokenError = useMemo(() => {
    const errorObject = errorAlert?.error?.serverErrors?.find((err) => err.field === "Token");
    return errorObject?.messages.join("\n");
  }, [errorAlert?.error?.serverErrors]);

  const onSubmit: (data: FormData) => unknown = useCallback(async (data) => {
    setError("");

    const pass = data.get("password");
    const passCheck = data.get("passwordCheck");

    if (typeof pass !== "string" || typeof passCheck !== "string" || !pass || !passCheck) {
      setError("Enter a password");
      return;
    }
    if (pass !== passCheck) {
      setError("The passwords do not match");
      return;
    }
    if (!email || !token) {
      setError("Information from the link could not be loaded, please, try again");
      return;
    }
    await resetPassword({ resetPasswordModel: {
      email,
      newPassword: pass,
      token,
    } });
  }, [
    email,
    resetPassword,
    token,
  ]);

  const generalError = useMemo(() => {
    const errorObject = errorAlert?.error?.serverErrors?.find((err) => !err.field);
    return errorObject?.messages.join("\n");
  }, [errorAlert?.error?.serverErrors]);

  return (
    <Box alignItems="center" display="flex" justifyContent="center" minHeight="100vh" position="relative">
      <Box flex="0 1 auto" width="300px">
        <HivesyncCard
          action={onSubmit}
          actions={(
            <Stack alignItems="center" spacing={2} width="100%">
              { success !== true && !tokenError
                && (
                  <RoundedButton
                    loading={loading}
                    type="submit"
                    variant="contained"
                  >
                    Send
                  </RoundedButton>
                )}
              { tokenError && email
                && (
                  <RoundedButton
                    onClick={() => { void resendEmail({ forgotPasswordModel: { email } }); }}
                    variant="contained"
                  >
                    Resend email
                  </RoundedButton>
                )}
              <ButtonLink size="small" to={paths.login.generate()} variant="text">Log in</ButtonLink>
            </Stack>
          )}
          title="Reset password"
        >
          {success !== true && !tokenError && (
            <Grid container spacing={2}>
              <Grid size={12}>
                <RoundTextField
                  disabled={loading}
                  error={!!passwordError}
                  fullWidth
                  label="Password *"
                  name="password"
                  type="password"
                  variant="outlined"
                />
              </Grid>
              <Grid size={12}>
                <RoundTextField
                  disabled={loading}
                  error={!!passwordError}
                  fullWidth
                  helperText={passwordError}
                  label="Repeat password *"
                  name="passwordCheck"
                  type="password"
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
          {success && (
            <Typography>
              Your password has been changed successfully.
            </Typography>
          )}
          {tokenError && <LocalErrorAlert message={tokenError} />}
          {generalError && (
            <LocalErrorAlert message={generalError} />
          )}
        </HivesyncCard>
      </Box>
    </Box>

  );
};

export default ResetPassword;
