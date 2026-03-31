import { useLayoutEffect } from "react";
import useDocumentMeta from "../../context/documentMeta/useDocumentMeta";
import ProjectDetail from "../pages/settings/ProjectDetail";

const ProjectRoute = () => {
  const { setSectionName } = useDocumentMeta();

  useLayoutEffect(() => {
    setSectionName("Project");

    return () => {
      setSectionName(null);
    };
  }, [setSectionName]);

  return (<ProjectDetail />);
};

export default ProjectRoute;
