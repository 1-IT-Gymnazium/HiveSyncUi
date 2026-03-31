// TODO: Look into this
/* eslint-disable react-hooks/refs */
import {
  Box,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import {
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import paths from "../../../routes/paths";
import ButtonLink from "../../common/link/ButtonLink";
import RoundTextField from "../../common/input/RoundTextField";
import HivesyncCard from "../../layout/HivesyncCard";
import LocalErrorAlert from "../../common/alert/LocalErrorAlert";
import RoundedButton from "../../common/button/RoundedButton";
import useRegistration from "./hooks/useRegistration";

const Registration = () => {
  const {
    errorAlert, loading, register,
  } = useRegistration();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordCheckRef = useRef<HTMLInputElement | null>(null);

  const [error, setError] = useState<number | null>(null);

  const [success, setSuccess] = useState(false);

  const onSubmit: React.SubmitEventHandler<HTMLFormElement> = useCallback(async (e) => {
    e.preventDefault();
    setError(null);

    const displayName = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const passwordCheck = passwordCheckRef.current?.value;

    if (displayName?.trim() && email?.trim() && password?.trim() && password.trim() === passwordCheck?.trim()) {
      const success = await register({
        registerModel: {
          displayName,
          email,
          password,
        },
      });
      setSuccess(success);
    }
    else {
      setError(Date.now());
    }
  }, [register]);

  const emailError = useMemo(() => {
    if (error && !emailRef.current?.value.trim()) {
      return "Enter your e-mail address";
    }
    const errorObject = errorAlert?.error?.serverErrors?.find((err) => err.field === "Email");
    return errorObject?.messages.join("\n");
  }, [error, errorAlert?.error?.serverErrors]);

  const displayNameError = useMemo(() => {
    if (error && !nameRef.current?.value.trim()) {
      return "Enter your name";
    }
    const errorObject = errorAlert?.error?.serverErrors?.find((err) => err.field === "DisplayName");
    return errorObject?.messages.join("\n");
  }, [error, errorAlert?.error?.serverErrors]);

  const passwordError = useMemo(() => {
    if (error && !passwordRef.current?.value.trim()) {
      return "Enter a password";
    }
    if (passwordRef.current?.value !== passwordCheckRef.current?.value) {
      return "The passwords do not match";
    }
    const errorObject = errorAlert?.error?.serverErrors?.find((err) => err.field === "Password");
    return errorObject?.messages.join("\n");
  }, [error, errorAlert?.error?.serverErrors]);

  const generalError = useMemo(() => {
    const errorObject = errorAlert?.error?.serverErrors?.find((err) => !err.field);
    return errorObject?.messages.join("\n");
  }, [errorAlert?.error?.serverErrors]);

  return (
    <Box alignItems="center" display="flex" justifyContent="center" minHeight="100vh" position="relative">
      <Box flex="0 1 auto" width="300px">
        <HivesyncCard
          actions={(
            <Stack alignItems="center" direction="column" spacing={2} width="100%">
              {!success && <RoundedButton loading={loading} sx={{ margin: "0 auto" }} type="submit" variant="contained">Sign up</RoundedButton>}
              <ButtonLink size="small" sx={{ margin: "0 auto" }} to={paths.login.generate()} variant="text">Log in</ButtonLink>
            </Stack>
          )}
          onSubmit={onSubmit}
          title="Registration"
        >
          {!success && (
            <Grid container spacing={2}>
              <Grid size={12}>
                <RoundTextField
                  disabled={loading}
                  error={!!emailError}
                  fullWidth
                  helperText={emailError}
                  inputRef={emailRef}
                  label="E-mail *"
                  variant="outlined"
                />
              </Grid>
              <Grid size={12}>
                <RoundTextField
                  disabled={loading}
                  error={!!displayNameError}
                  fullWidth
                  helperText={displayNameError}
                  inputRef={nameRef}
                  label="Full name *"
                  variant="outlined"
                />
              </Grid>
              <Grid size={12}>
                <RoundTextField
                  disabled={loading}
                  error={!!passwordError}
                  fullWidth
                  inputRef={passwordRef}
                  label="Password *"
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
                  inputRef={passwordCheckRef}
                  label="Repeat password *"
                  type="password"
                  variant="outlined"
                />
              </Grid>
              {generalError && (
                <Grid size={12}>
                  <LocalErrorAlert message={generalError} />
                </Grid>
              )}
            </Grid>
          )}
          {success && (
            <Typography mt={2}>
              Your registration is being processed. To continue, click the confirmation link in an e-mail you&apos;ll receive shortly.
            </Typography>
          )}
        </HivesyncCard>
      </Box>
    </Box>
  );
};
export default Registration;
