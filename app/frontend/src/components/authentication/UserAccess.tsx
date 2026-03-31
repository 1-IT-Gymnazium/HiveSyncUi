import {
  useEffect,
  useLayoutEffect,
} from "react";
import {
  Outlet, useLocation, useNavigate,
} from "react-router";

import useUser from "../../hooks/useUser";
import paths from "../../routes/paths";
import useApiContext from "../../context/api/useApiContext";

const USER_UNAUTHENTICATED_MIDDLEWARE = "user-unauthenticated-middleware";

function shouldReturnTo(path: string, searchQuery: string) {
  const pathname = path.replace(/\/+$/, "");
  const pathsToCheck = [paths.basePath.generate(), paths.today.generate()].map((string) => string.replace(/\/+$/, ""));

  return !pathsToCheck.includes(pathname) || searchQuery !== "";
}

const UserAccess = () => {
  const navigate = useNavigate();
  const {
    userLoading, userDetail,
  } = useUser();

  const {
    addMiddleware, removeMiddleware,
  } = useApiContext();

  const {
    pathname, search: searchQuery,
  } = useLocation();

  useLayoutEffect(() => {
    if (!userDetail) {
      void navigate(paths.login.generate(), { state: {
        returnTo: shouldReturnTo(pathname, searchQuery) ? pathname.concat(searchQuery) : undefined,
      } });
    }
  }, [
    navigate,
    pathname,
    searchQuery,
    userDetail,
    userLoading,
  ]);

  useEffect(() => {
    addMiddleware({
      id: USER_UNAUTHENTICATED_MIDDLEWARE,
      middleware: { post: async ({ response }) => {
        if (response.status >= 200 && response.status <= 299) {
          return Promise.resolve(response);
        }

        if (response.status === 401) {
          window.location.reload();
        }
        return Promise.resolve(response);
      } },
    });
    return () => {
      removeMiddleware(USER_UNAUTHENTICATED_MIDDLEWARE);
    };
  }, [addMiddleware, removeMiddleware]);

  return userDetail && <Outlet />;
};
export default UserAccess;
