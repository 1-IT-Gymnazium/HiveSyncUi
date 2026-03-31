import {
  useCallback, useState,
} from "react";
import useApiContext from "../../../../context/api/useApiContext";
import useAlert from "../../../../stores/useAlertStore";
import { ProjectDetailDto } from "../../../../context/api";

const useProjects = () => {
  const { projectApi } = useApiContext();
  const {
    processAlert, setAlert,
  } = useAlert();
  const [data, setData] = useState<ProjectDetailDto[]>();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const getProjects = useCallback(async () => {
    setLoading(true);
    try {
      const apiData = await projectApi.apiProjectGet();
      setData(apiData);
    }
    catch (error) {
      const alertData = await processAlert({
        error,
        id: "get-projects",
        type: "error",
      });
      setAlert(alertData);
      return [];
    }
    finally {
      setLoading(false);
    }
  }, [
    processAlert,
    projectApi,
    setAlert,
  ]);

  const deleteProject = useCallback(async (id: string) => {
    setDeleting(true);
    try {
      await projectApi.apiProjectIdDelete({ id });
      await getProjects();
      return true;
    }
    catch (error) {
      const alertData = await processAlert({
        error,
        id: "delete-project",
        type: "error",
      });
      setAlert(alertData);
      return false;
    }
    finally {
      setDeleting(false);
    }
  }, [
    getProjects,
    processAlert,
    projectApi,
    setAlert,
  ]);

  return {
    data,
    deleteProject,
    deleting,
    getProjects,
    loading,
  };
};

export default useProjects;
