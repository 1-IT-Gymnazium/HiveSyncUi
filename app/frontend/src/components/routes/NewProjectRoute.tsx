import { useLayoutEffect } from "react";
import useDocumentMeta from "../../context/documentMeta/useDocumentMeta";
import NewProject from "../pages/settings/NewProject";

const NewProjectRoute = () => {
  const { setSectionName } = useDocumentMeta();

  useLayoutEffect(() => {
    setSectionName("New project");

    return () => {
      setSectionName(null);
    };
  }, [setSectionName]);

  return (
    <NewProject />
  );
};

export default NewProjectRoute;
