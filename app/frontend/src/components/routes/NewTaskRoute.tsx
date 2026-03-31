import { useLayoutEffect } from "react";
import useDocumentMeta from "../../context/documentMeta/useDocumentMeta";
import NewTask from "../pages/task/NewTask";

const NewTaskRoute = () => {
  const { setSectionName } = useDocumentMeta();

  useLayoutEffect(() => {
    setSectionName("New task");

    return () => {
      setSectionName(null);
    };
  }, [setSectionName]);

  return (
    <NewTask />
  );
};

export default NewTaskRoute;
