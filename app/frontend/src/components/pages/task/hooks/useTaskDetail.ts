import {
  useCallback, useState,
} from "react";
import useApiContext from "../../../../context/api/useApiContext";
import useAlert from "../../../../stores/useAlertStore";
import {
  ApiTodoIdGetRequest, ApiTodoIdPatchRequest, TodoDetailDto,
} from "../../../../context/api";

const useTaskDetail = () => {
  const { todoApi } = useApiContext();
  const {
    processAlert,
    setAlert,
  } = useAlert();

  const [data, setData] = useState<TodoDetailDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const getTask = useCallback(async (params: ApiTodoIdGetRequest) => {
    setLoading(true);
    try {
      const apiData = await todoApi.apiTodoIdGet(params);
      setData(apiData);
      return true;
    }
    catch (error) {
      const alert = await processAlert({
        error,
        id: "get-task",
        type: "error",
      });
      setAlert(alert);
      return false;
    }
    finally {
      setLoading(false);
    }
  }, [
    processAlert,
    setAlert,
    todoApi,
  ]);

  const patchTask = useCallback(async (params: ApiTodoIdPatchRequest) => {
    setUpdating(true);
    try {
      await todoApi.apiTodoIdPatch(params);
      const alert = await processAlert({
        id: "patch-task",
        message: "Task was updated successfully.",
        type: "success",
      });
      setAlert(alert);
      return true;
    }
    catch (error) {
      const alert = await processAlert({
        error,
        id: "patch-task",
        type: "error",
      });
      setAlert(alert);
      return false;
    }
    finally {
      setUpdating(false);
    }
  }, [
    processAlert,
    setAlert,
    todoApi,
  ]);

  return {
    data,
    getTask,
    loading,
    patchTask,
    updating,
  };
};

export default useTaskDetail;
