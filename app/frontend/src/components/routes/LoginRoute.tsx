import { useLayoutEffect } from "react";
import useDocumentMeta from "../../context/documentMeta/useDocumentMeta";
import Login from "../pages/login/Login";

const LoginRoute = () => {
  const { setSectionName } = useDocumentMeta();

  useLayoutEffect(() => {
    setSectionName("Login");

    return () => {
      setSectionName(null);
    };
  }, [setSectionName]);

  return (<Login />);
};

export default LoginRoute;
