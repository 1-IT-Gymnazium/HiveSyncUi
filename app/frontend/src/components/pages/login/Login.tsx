// TODO: Look into this
/* eslint-disable react-hooks/refs */
import {
  Box,
  Grid,
  Stack,
} from "@mui/material";
import {
  useState, useCallback,
  useRef,
  useMemo,
} from "react";
import {
  useLocation, useNavigate,
} from "react-router";
import paths from "../../../routes/paths";
import RoundTextField from "../../common/input/RoundTextField";
import HivesyncCard from "../../layout/HivesyncCard";
import LocalErrorAlert from "../../common/alert/LocalErrorAlert";
import RoundedButton from "../../common/button/RoundedButton";
import ButtonLink from "../../common/link/ButtonLink";
import useLogin from "./hooks/useLogin";

const isStateWithReturnTo = (state: unknown): state is { returnTo: string } => {
  return !!state && typeof state === "object" && "returnTo" in state && typeof state.returnTo === "string";
};

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    errorAlert, loading, login,
  } = useLogin();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [error, setError] = useState<number | null>(null);

  const onSubmit: React.SubmitEventHandler<HTMLFormElement> = useCallback(async (e) => {
    e.preventDefault();
    setError(null);

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (email?.trim() && password?.trim()) {
      const success = await login({
        loginModel: {
          email,
          password,
        },
      });
      if (success) {
        void navigate(isStateWithReturnTo(location.state) ? location.state.returnTo : paths.basePath.generate());
      }
    }
    else {
      setError(Date.now());
    }
  }, [
    location.state,
    login,
    navigate,
  ]);

  const emailError = useMemo(() => {
    if (error && !emailRef.current?.value.trim()) {
      return "Enter your e-mail address";
    }
    const errorObject = errorAlert?.error?.serverErrors?.find((err) => err.field === "Email");
    return errorObject?.messages.join("\n");
  }, [error, errorAlert?.error?.serverErrors]);

  const passwordError = useMemo(() => {
    if (error && !passwordRef.current?.value.trim()) {
      return "Enter a password";
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
              <RoundedButton loading={loading} type="submit" variant="contained">Log in</RoundedButton>
              <RoundedButton href={paths.registration.generate()} size="small" variant="text">Sign up</RoundedButton>
            </Stack>
          )}
          largeTitle
          onSubmit={onSubmit}
        >
          <Grid container spacing={2}>
            <Grid size={12}>
              <RoundTextField
                error={!!emailError}
                fullWidth
                helperText={emailError}
                inputRef={emailRef}
                label="E-mail"
                variant="outlined"
              />
            </Grid>
            <Grid size={12}>
              <RoundTextField
                error={!!passwordError}
                fullWidth
                helperText={passwordError}
                inputRef={passwordRef}
                label="Password"
                type="password"
                variant="outlined"
              />
              <ButtonLink size="small" to={paths.forgottenPassword.generate()} variant="text">Forgotten password</ButtonLink>
            </Grid>
            {generalError && (
              <Grid size={12}>
                <LocalErrorAlert message={generalError} />
              </Grid>
            )}
          </Grid>
        </HivesyncCard>
      </Box>
    </Box>
  );
};
export default Login;
