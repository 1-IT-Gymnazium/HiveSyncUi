import { useLayoutEffect } from "react";
import useDocumentMeta from "../../context/documentMeta/useDocumentMeta";
import ResetPassword from "../pages/resetPassword/ResetPassword";

const ResetPasswordRoute = () => {
  const { setSectionName } = useDocumentMeta();

  useLayoutEffect(() => {
    setSectionName("Reset password");

    return () => {
      setSectionName(null);
    };
  }, [setSectionName]);

  return (<ResetPassword />);
};

export default ResetPasswordRoute;
