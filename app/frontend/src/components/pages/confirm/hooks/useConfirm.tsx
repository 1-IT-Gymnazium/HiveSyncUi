import {
  useCallback, useState,
} from "react";
import useApiContext from "../../../../context/api/useApiContext";
import {
  ApiAuthResendConfirmationPostRequest, ApiAuthValidateTokenPostRequest,
} from "../../../../context/api";
import useAlert, { AlertData } from "../../../../stores/useAlertStore";

const useConfirm = () => {
  const { authApi } = useApiContext();
  const {
    processAlert,
    setAlert,
  } = useAlert();

  const [loading, setLoading] = useState(false);
  const [errorAlert, setErrorAlert] = useState<AlertData | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);

  const confirmRegistration = useCallback(async (params: ApiAuthValidateTokenPostRequest) => {
    setLoading(true);
    try {
      await authApi.apiAuthValidateTokenPost(params);
      setSuccess(true);
      return true;
    }
    catch (error) {
      const alert = await processAlert({
        error,
        id: "confirm-registration",
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

  const resendRegistration = useCallback(async (params: ApiAuthResendConfirmationPostRequest) => {
    try {
      await authApi.apiAuthResendConfirmationPost(params);
      const alertData = await processAlert({
        id: "resend-email",
        message: "We have sent you an email with a new token for the registration.",
        type: "success",
      });
      setAlert(alertData);
      return true;
    }
    catch (error) {
      const alert = await processAlert({
        error,
        id: "resend-registration",
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
    confirmRegistration,
    errorAlert,
    loading,
    resendRegistration,
    success,
  };
};

export default useConfirm;
