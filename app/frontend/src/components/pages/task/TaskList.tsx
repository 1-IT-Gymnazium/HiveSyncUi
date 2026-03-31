import {
  Box,
  List,
  Stack,
  Typography,
} from "@mui/material";

import {
  useCallback, useMemo,
} from "react";
import { useNavigate } from "react-router";
import TaskListItem from "../../common/task/TaskListItem";
import paths from "../../../routes/paths";
import useTaskList from "./hooks/useTaskStateUpdate";
import { TaskState } from "./utils/taskStateEnum";
import { TaskPriority } from "./utils/taskPriorityEnum";
import { Task } from "./hooks/useTasks";

const generalTaskSort = (a: Task, b: Task) => {
  if (a.state === b.state) {
    if (a.priority === b.priority) {
      if (a.dueAt === b.dueAt) {
        return 0;
      }
      if (a.dueAt && !b.dueAt) {
        return -1;
      }
      if (!a.dueAt && b.dueAt) {
        return 1;
      }
      if (a.dueAt && b.dueAt && a.dueAt < b.dueAt) {
        return -1;
      }
      return 1;
    }
    if (a.priority === TaskPriority.High || (a.priority === TaskPriority.Medium && b.priority === TaskPriority.Low)) {
      return -1;
    }
    return 1;
  }
  if (a.state === TaskState.InProgress || (a.state === TaskState.ToDo && b.state === TaskState.Done)) {
    return -1;
  }
  return 1;
};

interface TaskListProps {
  refresh?: () => Promise<unknown>;
  data: Task[];
}

const TaskList = ({
  data,
  refresh,
}: TaskListProps) => {
  const {
    deleteTask, updateTaskState,
  } = useTaskList(refresh);
  const navigate = useNavigate();

  const sortedData = useMemo(() => data.sort((a, b) => {
    if (a.relevance === undefined) {
      if (b.relevance !== undefined) {
        return 1;
      }
      return generalTaskSort(a, b);
    }
    if (b.relevance === undefined) {
      return -1;
    }
    if (a.relevance > b.relevance) {
      return -1;
    }
    if (a.relevance < b.relevance) {
      return 1;
    }
    if (a.relevance === b.relevance) {
      return generalTaskSort(a, b);
    }
    return generalTaskSort(a, b);
  }), [data]);

  const onEdit = useCallback(async (id: string) => {
    await navigate(paths.task.generate({ id }));
  }, [navigate]);

  if (sortedData.length < 1) {
    return (
      <Stack height="100%" justifyContent="center">
        <Typography textAlign="center">
          No tasks found.
        </Typography>
      </Stack>
    );
  }

  return (
    <List>
      {sortedData.map((entry) => (
        <TaskListItem
          key={entry.id}
          onDelete={deleteTask}
          onEdit={onEdit}
          onStateChange={updateTaskState}
          task={entry}
        />
      ))}
      {sortedData.length === 0 && (
        <Box height="100%" />
      )}
    </List>
  );
};

export default TaskList;
