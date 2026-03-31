import { useLayoutEffect } from "react";
import useDocumentMeta from "../../context/documentMeta/useDocumentMeta";
import ForgottenPassword from "../pages/forgottenPassword/ForgottenPassword";

const ForgottenPasswordRoute = () => {
  const { setSectionName } = useDocumentMeta();

  useLayoutEffect(() => {
    setSectionName("Forgotten password");

    return () => {
      setSectionName(null);
    };
  }, [setSectionName]);

  return (<ForgottenPassword />);
};

export default ForgottenPasswordRoute;
