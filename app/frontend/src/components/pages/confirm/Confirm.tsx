import {
  Box, CircularProgress, Stack, Typography,
} from "@mui/material";
import { useSearchParams } from "react-router";
import {
  useLayoutEffect, useMemo,
} from "react";
import HivesyncCard from "../../layout/HivesyncCard";
import ButtonLink from "../../common/link/ButtonLink";
import paths from "../../../routes/paths";
import LocalErrorAlert from "../../common/alert/LocalErrorAlert";
import RoundedButton from "../../common/button/RoundedButton";
import useConfirm from "./hooks/useConfirm";

const Confirm = () => {
  const [urlSearchParams] = useSearchParams();
  const {
    errorAlert,
    confirmRegistration,
    loading,
    resendRegistration,
    success,
  } = useConfirm();

  const email = urlSearchParams.get("email");
  const token = urlSearchParams.get("token");

  useLayoutEffect(() => {
    if (email && token) {
      void confirmRegistration({
        tokenModel: {
          email,
          token,
        },
      });
    }
  }, [
    confirmRegistration,
    email,
    token,
    urlSearchParams,
  ]);

  const tokenError = useMemo(() => {
    const errorObject = errorAlert?.error?.serverErrors?.find((err) => err.field === "Token");
    return errorObject?.messages.join("\n");
  }, [errorAlert?.error?.serverErrors]);

  return (
    <Box alignItems="center" display="flex" justifyContent="center" minHeight="100vh" position="relative">
      <Box flex="0 1 auto" width="300px">
        <HivesyncCard
          actions={(
            <Stack alignItems="center" spacing={2} width="100%">
              { tokenError && email
                && (
                  <RoundedButton
                    onClick={() => { void resendRegistration({ resendConfirmationEmailModel: { email } }); }}
                    variant="contained"
                  >
                    Resend email
                  </RoundedButton>
                )}
              { success !== null
                && (
                  <ButtonLink
                    size="small"
                    sx={{ mx: "auto" }}
                    to={paths.login.generate()}
                    variant="text"
                  >
                    Log in
                  </ButtonLink>
                )}
            </Stack>
          )}
          title="Confirm email"
        >
          {(!email || !token) && <LocalErrorAlert message="Your confirmation link is invalid." />}
          {loading && (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          )}
          {success && (
            <Typography>
              Your account has been verified successfully.
            </Typography>
          )}
          {success === false
            && !loading
            && (
              <LocalErrorAlert message={errorAlert?.message ?? "There has been a problem with the verification process. Please, try again later."} />
            )}
        </HivesyncCard>
      </Box>
    </Box>

  );
};

export default Confirm;
