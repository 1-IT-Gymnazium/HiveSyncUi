import {
  useCallback, useState,
} from "react";
import { useNavigate } from "react-router";
import { Stack } from "@mui/material";
import PageLayout from "../../layout/PageLayout";
import RoundedButton from "../../common/button/RoundedButton";
import useProjectDetail from "./hooks/useProjectDetail";
import ProjectForm, { ProjectFormData } from "./ProjectForm";

const NewProject = () => {
  const {
    createProject,
    creating,
  } = useProjectDetail();
  const navigate = useNavigate();
  const [canSubmit, setCanSubmit] = useState(false);

  const handleSubmit = useCallback(async (data: ProjectFormData) => {
    const success = await createProject({
      addProjectDto: {
        color: data.color.trim(),
        name: data.name.trim(),
      },
    });
    if (success) {
      await navigate(-1);
    }
  }, [createProject, navigate]);

  return (
    <PageLayout title="New project">
      <ProjectForm
        buttons={(
          <Stack alignItems="center" direction="row" gap={2} justifyContent="center" pb={2}>
            <RoundedButton onClick={() => navigate(-1)}>
              Cancel
            </RoundedButton>
            <RoundedButton
              disabled={creating || !canSubmit}
              loading={creating}
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

export default NewProject;
