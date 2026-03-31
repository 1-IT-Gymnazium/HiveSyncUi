import {
  useCallback, useState,
} from "react";
import useApiContext from "../../../../context/api/useApiContext";
import {
  ApiAuthForgotPasswordPostRequest,
  ApiAuthResetPasswordPostRequest,
} from "../../../../context/api";
import useAlert, { AlertData } from "../../../../stores/useAlertStore";

const useResetPassword = () => {
  const { authApi } = useApiContext();
  const {
    processAlert,
    setAlert,
  } = useAlert();

  const [loading, setLoading] = useState(false);
  const [errorAlert, setErrorAlert] = useState<AlertData | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);

  const resetPassword = useCallback(async (params: ApiAuthResetPasswordPostRequest) => {
    setLoading(true);
    try {
      await authApi.apiAuthResetPasswordPost(params);
      setSuccess(true);
      return true;
    }
    catch (error) {
      const alert = await processAlert({
        error,
        id: "reset-password",
        type: "error",
      });
      setErrorAlert(alert);
      setSuccess(false);
      return false;
    }
    finally {
      setLoading(false);
    }
  }, [authApi, processAlert]);

  const resendEmail = useCallback(async (params: ApiAuthForgotPasswordPostRequest) => {
    try {
      await authApi.apiAuthForgotPasswordPost(params);
      const alertData = await processAlert({
        id: "resend-email",
        message: "We have sent you an email with a new password reset link.",
        type: "success",
      });
      setAlert(alertData);
      return true;
    }
    catch (error) {
      const alert = await processAlert({
        error,
        id: "resend-email",
        type: "error",
      });
      setErrorAlert(alert);
      return false;
    }
  }, [
    authApi,
    processAlert,
    setAlert,
  ]);

  return {
    errorAlert,
    loading,
    resendEmail,
    resetPassword,
    success,
  };
};

export default useResetPassword;
