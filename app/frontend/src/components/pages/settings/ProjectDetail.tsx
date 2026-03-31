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
import useProjectDetail from "./hooks/useProjectDetail";
import ProjectForm, { ProjectFormData } from "./ProjectForm";

const ProjectDetail = () => {
  const { id } = useParams();
  const {
    getProject, updateProject, updating, data, loading,
  } = useProjectDetail();
  const navigate = useNavigate();
  const { setDetailName } = useDocumentMeta();
  const [canSubmit, setCanSubmit] = useState(false);

  useLayoutEffect(() => {
    if (!id) {
      return;
    }
    void getProject(id);
  }, [getProject, id]);

  const handleSubmit = useCallback(async (data: ProjectFormData) => {
    if (!id) {
      return;
    }
    const success = await updateProject({
      id,
      updateProjectDto: {
        color: data.color.trim(),
        name: data.name.trim(),
      },
    });
    if (success) {
      await navigate(-1);
    }
  }, [
    id,
    navigate,
    updateProject,
  ]);

  useEffect(() => {
    if (data) {
      setDetailName(data.name);
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
    <PageLayout subtitle={data.name} title="Edit project">
      <ProjectForm
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

export default ProjectDetail;
