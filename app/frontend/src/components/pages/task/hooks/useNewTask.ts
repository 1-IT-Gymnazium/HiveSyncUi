import {
  useCallback, useState,
} from "react";
import useApiContext from "../../../../context/api/useApiContext";
import useAlert from "../../../../stores/useAlertStore";
import { ApiTodoPostRequest } from "../../../../context/api";

const useNewTask = () => {
  const { todoApi } = useApiContext();
  const {
    processAlert,
    setAlert,
  } = useAlert();

  const [loading, setLoading] = useState(false);

  const postTask = useCallback(async (params: ApiTodoPostRequest) => {
    setLoading(true);
    try {
      await todoApi.apiTodoPost(params);
      const alert = await processAlert({
        id: "post-task",
        message: "Task was created successfully.",
        type: "success",
      });
      setAlert(alert);
      return true;
    }
    catch (error) {
      const alert = await processAlert({
        error,
        id: "post-task",
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

  return {
    loading,
    postTask,
  };
};

export default useNewTask;
