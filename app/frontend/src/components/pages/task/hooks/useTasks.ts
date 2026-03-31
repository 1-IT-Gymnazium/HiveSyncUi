import {
  useCallback, useState,
} from "react";
import useApiContext from "../../../../context/api/useApiContext";
import useAlert from "../../../../stores/useAlertStore";
import { TodoDetailDto } from "../../../../context/api";

export type Task = TodoDetailDto & {
  relevance?: number;
};

const useTasks = () => {
  const { todoApi } = useApiContext();
  const {
    processAlert,
    setAlert,
  } = useAlert();

  const [data, setData] = useState<Task[] | null>(null);
  const [loading, setLoading] = useState(false);

  const getTasks = useCallback(async () => {
    setLoading(true);
    try {
      const apiTasks = await todoApi.apiTodoGet();
      setData(apiTasks);
      return true;
    }
    catch (error) {
      const alert = await processAlert({
        error,
        id: "get-overview",
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
    data,
    getTasks,
    loading,
  };
};

export default useTasks;
