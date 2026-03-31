import { useLayoutEffect } from "react";
import Confirm from "../pages/confirm/Confirm";
import useDocumentMeta from "../../context/documentMeta/useDocumentMeta";

const ConfirmRoute = () => {
  const { setSectionName } = useDocumentMeta();

  useLayoutEffect(() => {
    setSectionName("Account confirmation");

    return () => {
      setSectionName(null);
    };
  }, [setSectionName]);

  return (<Confirm />);
};

export default ConfirmRoute;
