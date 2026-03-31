import {
  useCallback, useState,
} from "react";
import useApiContext from "../../../../context/api/useApiContext";
import useAlert from "../../../../stores/useAlertStore";
import { TaskState } from "../utils/taskStateEnum";

const useTaskList = (refresh?: () => Promise<unknown>) => {
  const { todoApi } = useApiContext();
  const {
    processAlert, setAlert,
  } = useAlert();
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const deleteTask = useCallback(async (id: string) => {
    setDeleting(true);
    try {
      await todoApi.apiTodoIdDelete({ id });
      const alert = await processAlert({
        id: "delete-task",
        message: "Task removed successfully.",
        type: "success",
      });
      setAlert(alert);
      if (refresh) {
        await refresh();
      }
      return true;
    }
    catch (error) {
      const alert = await processAlert({
        error,
        id: "delete-task",
        type: "error",
      });
      setAlert(alert);
      return false;
    }
    finally {
      setDeleting(false);
    }
  }, [
    processAlert,
    refresh,
    setAlert,
    todoApi,
  ]);

  const updateTaskState = useCallback(async ({
    id, state,
  }: {
    id: string;
    state: TaskState;
  }) => {
    setUpdating(true);
    try {
      await todoApi.apiTodoIdPatch({
        id,
        updateTodoDto: {
          stateId: state,
        },
      });
      if (refresh) {
        await refresh();
      }
      return true;
    }
    catch (error) {
      const alert = await processAlert({
        error,
        id: "update-task-state",
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
    refresh,
    setAlert,
    todoApi,
  ]);

  return {
    deleteTask,
    deleting,
    updateTaskState,
    updating,
  };
};

export default useTaskList;
