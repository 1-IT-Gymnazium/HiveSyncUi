import {
  useCallback, useEffect, useLayoutEffect,
  useState,
} from "react";
import {
  useNavigate, useParams,
} from "react-router";
import {
  Box, CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import PageLayout from "../../layout/PageLayout";
import RoundedButton from "../../common/button/RoundedButton";
import useDocumentMeta from "../../../context/documentMeta/useDocumentMeta";
import TaskForm, { TaskFormData } from "./TaskForm";
import useTaskDetail from "./hooks/useTaskDetail";

const TaskDetail = () => {
  const { id } = useParams();
  const {
    data, getTask, loading, patchTask, updating,
  } = useTaskDetail();
  const navigate = useNavigate();
  const { setDetailName } = useDocumentMeta();
  const [canSubmit, setCanSubmit] = useState(false);

  useLayoutEffect(() => {
    if (!id) {
      return;
    }
    void getTask({ id });
  }, [getTask, id]);

  const handleSubmit = useCallback(async (data: TaskFormData) => {
    if (!id) {
      return;
    }
    const success = await patchTask({
      id,
      updateTodoDto: {
        description: data.description,
        dueAt: data.dueAt?.toDate(),
        priorityId: data.priorityId,
        projectId: data.projectId,
        sectionId: data.sectionId,
        stateId: data.stateId,
        summary: data.summary,
      },
    });
    if (success) {
      await navigate(-1);
    }
  }, [
    id,
    navigate,
    patchTask,
  ]);

  useEffect(() => {
    if (data) {
      setDetailName(data.summary);
    }
    return () => {
      setDetailName(null);
    };
  }, [data, setDetailName]);

  if (!data || loading) {
    return (
      <Box display="flex" height="100%" justifyContent="center">
        {loading && <CircularProgress />}
        {!data && !loading && <Typography>No data</Typography>}
      </Box>
    );
  }

  return (
    <PageLayout subtitle={data.summary} title="Edit task">
      <TaskForm
        buttons={(
          <Stack alignItems="center" direction="row" gap={2} justifyContent="center" pb={2}>
            <RoundedButton onClick={() => navigate(-1)}>
              Cancel
            </RoundedButton>
            <RoundedButton
              disabled={updating || !canSubmit}
              loading={updating}
              type="submit"
              variant="contained"
            >
              Update
            </RoundedButton>
          </Stack>
        )}
        data={data}
        onSubmit={handleSubmit}
        onValidChange={setCanSubmit}
      />
    </PageLayout>
  );
};

export default TaskDetail;
