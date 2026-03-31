import {
  useCallback, useState,
} from "react";
import useApiContext from "../../../../context/api/useApiContext";
import useAlert, { AlertData } from "../../../../stores/useAlertStore";
import { ApiAuthLoginPostRequest } from "../../../../context/api";
import useUser from "../../../../hooks/useUser";

const useLogin = () => {
  const { authApi } = useApiContext();
  const {
    processAlert, setAlert,
  } = useAlert();
  const { getUserDetail } = useUser();

  const [loading, setLoading] = useState(false);
  const [errorAlert, setErrorAlert] = useState<AlertData | null>(null);

  const login = useCallback(async (props: ApiAuthLoginPostRequest) => {
    setLoading(true);
    try {
      await authApi.apiAuthLoginPost(props);
      const alert = await processAlert({
        id: "login",
        message: "Logged in successfully",
        type: "success",
      });
      setAlert(alert);
      await getUserDetail();
      return true;
    }
    catch (error) {
      const alert = await processAlert({
        error,
        id: "login",
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
    getUserDetail,
    processAlert,
    setAlert,
  ]);

  return {
    errorAlert,
    loading,
    login,
  };
};

export default useLogin;
