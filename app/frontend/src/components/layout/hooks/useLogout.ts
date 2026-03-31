import {
  useCallback, useState,
} from "react";
import useApiContext from "../../../context/api/useApiContext";

const useLogout = () => {
  const { authApi } = useApiContext();
  const [isLoading, setIsLoading] = useState(false);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authApi.apiAuthLogoutPost();
      return true;
    }
    catch {
      return false;
    }
    finally {
      setIsLoading(false);
    }
  }, [authApi]);

  return {
    isLoading,
    logout,
  };
};

export default useLogout;
