import { useCallback } from "react";
import useApiContext from "../context/api/useApiContext";
import useUserStore from "../stores/useUserStore";

const useUser = () => {
  const {
    setUserDetail, setUserLoading, userDetail, userLoading,
  } = useUserStore();
  const { authApi } = useApiContext();

  const getUserDetail = useCallback(async () => {
    setUserLoading(true);
    try {
      const apiDetail = await authApi.apiAuthUserInfoGet();
      setUserDetail(apiDetail);
      return true;
    }
    catch {
      return false;
    }
    finally {
      setUserLoading(false);
    }
  }, [
    authApi,
    setUserDetail,
    setUserLoading,
  ]);

  return {
    getUserDetail,
    userDetail,
    userLoading,
  };
};

export default useUser;
