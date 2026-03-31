import { useLayoutEffect } from "react";
import useDocumentMeta from "../../context/documentMeta/useDocumentMeta";
import TaskDetail from "../pages/task/TaskDetail";

const TaskRoute = () => {
  const { setSectionName } = useDocumentMeta();

  useLayoutEffect(() => {
    setSectionName("Task");

    return () => {
      setSectionName(null);
    };
  }, [setSectionName]);

  return (<TaskDetail />);
};

export default TaskRoute;
