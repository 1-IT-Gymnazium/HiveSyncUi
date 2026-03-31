import { useLayoutEffect } from "react";
import useDocumentMeta from "../../context/documentMeta/useDocumentMeta";
import Registration from "../pages/registration/Registration";

const RegistrationRoute = () => {
  const { setSectionName } = useDocumentMeta();

  useLayoutEffect(() => {
    setSectionName("Registration");

    return () => {
      setSectionName(null);
    };
  }, [setSectionName]);

  return (<Registration />);
};

export default RegistrationRoute;
