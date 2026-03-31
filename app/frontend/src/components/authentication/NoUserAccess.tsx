import {
  useEffect,
} from "react";
import {
  Outlet, useNavigate,
} from "react-router";

import useUser from "../../hooks/useUser";
import paths from "../../routes/paths";

const NoUserAccess = () => {
  const navigate = useNavigate();
  const {
    userLoading, userDetail,
  } = useUser();

  useEffect(() => {
    if (userDetail) {
      void navigate(paths.basePath.generate());
    }
  }, [
    navigate,
    userDetail,
    userLoading,
  ]);

  return !userDetail && <Outlet />;
};
export default NoUserAccess;
