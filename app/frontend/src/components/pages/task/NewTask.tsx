import {
  useCallback, useState,
} from "react";
import { useNavigate } from "react-router";
import { Stack } from "@mui/material";
import PageLayout from "../../layout/PageLayout";
import RoundedButton from "../../common/button/RoundedButton";
import TaskForm, { TaskFormData } from "./TaskForm";
import useNewTask from "./hooks/useNewTask";

const NewTask = () => {
  const {
    loading,
    postTask,
  } = useNewTask();
  const navigate = useNavigate();
  const [canSubmit, setCanSubmit] = useState(false);

  const handleSubmit = useCallback(async (data: TaskFormData) => {
    const success = await postTask({ addTodoDto: {
      description: data.description,
      dueAt: data.dueAt?.toDate(),
      priorityId: data.priorityId,
      projectId: data.projectId,
      sectionId: data.sectionId,
      stateId: data.stateId,
      summary: data.summary,
    } });
    if (success) {
      await navigate(-1);
    }
  }, [navigate, postTask]);

  return (
    <PageLayout title="New task">
      <TaskForm
        buttons={(
          <Stack alignItems="center" direction="row" gap={2} justifyContent="center" pb={2}>
            <RoundedButton onClick={() => navigate(-1)}>
              Cancel
            </RoundedButton>
            <RoundedButton
              disabled={loading || !canSubmit}
              loading={loading}
              type="submit"
              variant="contained"
            >
              Create
            </RoundedButton>
          </Stack>
        )}
        onSubmit={handleSubmit}
        onValidChange={setCanSubmit}
      />
    </PageLayout>
  );
};

export default NewTask;
