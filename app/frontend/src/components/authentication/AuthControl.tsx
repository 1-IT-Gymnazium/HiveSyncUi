import {
  PropsWithChildren, useEffect, useLayoutEffect,
} from "react";
import {
  Box, CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router";
import useUser from "../../hooks/useUser";
import useApiContext from "../../context/api/useApiContext";

import paths from "../../routes/paths";
import { handleError } from "../../stores/useAlertStore";
import { ErrorType } from "../../utils/enum/errorTypeEnum";

const BASE_ERROR_RESPONSE_MIDDLEWARE = "base-error-middleware-response";

const AuthControl: React.FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
  const {
    getUserDetail,
    userLoading,
  } = useUser();
  const {
    addMiddleware, removeMiddleware,
  } = useApiContext();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    void getUserDetail();
  }, [getUserDetail]);

  useEffect(() => {
    addMiddleware({
      id: BASE_ERROR_RESPONSE_MIDDLEWARE,
      middleware: { post: async ({ response }) => {
        if (response.status >= 200 && response.status <= 299) {
          return Promise.resolve(response);
        }

        const error = await handleError(response);

        if (error.type === ErrorType.NOT_FOUND) {
          await navigate(paths.notFound.generate(), { replace: true });
        }

        if (error.type === ErrorType.FORBIDDEN) {
          await navigate(paths.forbidden.generate(), { replace: true });
        }

        return Promise.resolve(response);
      } },
    });
    return () => {
      removeMiddleware(BASE_ERROR_RESPONSE_MIDDLEWARE);
    };
  }, [
    addMiddleware,
    navigate,
    removeMiddleware,
  ]);

  if (userLoading) {
    return <Box alignItems="center" display="flex" height="100dvh" justifyContent="center"><CircularProgress /></Box>;
  }

  return children;
};

export default AuthControl;
