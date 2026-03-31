import {
  useCallback, useState,
} from "react";
import useApiContext from "../../../../context/api/useApiContext";
import {
  ApiAuthForgotPasswordPostRequest,
} from "../../../../context/api";
import useAlert, { AlertData } from "../../../../stores/useAlertStore";

const useForgottenPassword = () => {
  const { authApi } = useApiContext();
  const {
    processAlert,
  } = useAlert();

  const [loading, setLoading] = useState(false);
  const [errorAlert, setErrorAlert] = useState<AlertData | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);

  const sendReset = useCallback(async (params: ApiAuthForgotPasswordPostRequest) => {
    setLoading(true);
    try {
      await authApi.apiAuthForgotPasswordPost(params);
      setSuccess(true);
      return true;
    }
    catch (error) {
      const alert = await processAlert({
        error,
        id: "forgotten-password",
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

  return {
    errorAlert,
    loading,
    sendReset,
    success,
  };
};

export default useForgottenPassword;
