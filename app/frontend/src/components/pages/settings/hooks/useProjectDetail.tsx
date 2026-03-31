import {
  useCallback, useState,
} from "react";
import useApiContext from "../../../../context/api/useApiContext";
import useAlert from "../../../../stores/useAlertStore";
import {
  ApiProjectIdPatchRequest, ApiProjectPostRequest, ProjectDetailDto,
} from "../../../../context/api";

const useProjectDetail = () => {
  const { projectApi } = useApiContext();
  const {
    processAlert, setAlert,
  } = useAlert();
  const [data, setData] = useState<ProjectDetailDto>();
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [creating, setCreating] = useState(false);

  const getProject = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const apiData = await projectApi.apiProjectIdGet({ id });
      setData(apiData);
    }
    catch (error) {
      const alertData = await processAlert({
        error,
        id: "get-project-detail",
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

  const createProject = useCallback(async (params: ApiProjectPostRequest) => {
    setCreating(true);
    try {
      await projectApi.apiProjectPost(params);
      return true;
    }
    catch (error) {
      const alertData = await processAlert({
        error,
        id: "create-project-detail",
        type: "error",
      });
      setAlert(alertData);
      return false;
    }
    finally {
      setCreating(false);
    }
  }, [
    processAlert,
    projectApi,
    setAlert,
  ]);

  const updateProject = useCallback(async (params: ApiProjectIdPatchRequest) => {
    setUpdating(true);
    try {
      await projectApi.apiProjectIdPatch(params);
      return true;
    }
    catch (error) {
      const alertData = await processAlert({
        error,
        id: "update-project-detail",
        type: "error",
      });
      setAlert(alertData);
      return false;
    }
    finally {
      setUpdating(false);
    }
  }, [
    processAlert,
    projectApi,
    setAlert,
  ]);

  return {
    createProject,
    creating,
    data,
    getProject,
    loading,
    updateProject,
    updating,
  };
};

export default useProjectDetail;
