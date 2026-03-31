import {
  useCallback, useState,
} from "react";
import useApiContext from "../../../../context/api/useApiContext";
import { ApiAuthRegisterPostRequest } from "../../../../context/api";
import useAlert, { AlertData } from "../../../../stores/useAlertStore";

const useRegistration = () => {
  const { authApi } = useApiContext();
  const {
    processAlert, setAlert,
  } = useAlert();
  const [loading, setLoading] = useState(false);
  const [errorAlert, setErrorAlert] = useState<AlertData | null>(null);

  const register = useCallback(async (params: ApiAuthRegisterPostRequest) => {
    setLoading(true);
    try {
      await authApi.apiAuthRegisterPost(params);
      const alert = await processAlert({
        id: "register",
        message: "Registration successful. You will receive a confirmation email shortly.",
        type: "success",
      });
      setAlert(alert);
      return true;
    }
    catch (error) {
      const alert = await processAlert({
        error,
        id: "register",
        type: "error",
      });
      setErrorAlert(alert);
      return false;
    }
    finally {
      setLoading(false);
    }
  }, [
    authApi,
    processAlert,
    setAlert,
  ]);

  return {
    errorAlert,
    loading,
    register,
  };
};

export default useRegistration;
