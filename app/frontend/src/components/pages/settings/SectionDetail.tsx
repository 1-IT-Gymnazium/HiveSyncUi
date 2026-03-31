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
import SectionForm, { SectionFormData } from "./SectionForm";
import useSectionDetail from "./hooks/useSectionDetail";

const SectionDetail = () => {
  const { id } = useParams();
  const {
    getSection, updateSection, updating, data, loading,
  } = useSectionDetail();
  const navigate = useNavigate();
  const { setDetailName } = useDocumentMeta();
  const [canSubmit, setCanSubmit] = useState(false);

  useLayoutEffect(() => {
    if (!id) {
      return;
    }
    void getSection(id);
  }, [getSection, id]);

  const handleSubmit = useCallback(async (data: SectionFormData) => {
    if (!id) {
      return;
    }
    const success = await updateSection({
      id,
      updateSectionDto: {
        color: data.color.trim(),
        name: data.name.trim(),
        projectId: data.projectId.trim(),
      },
    });
    if (success) {
      await navigate(-1);
    }
  }, [
    id,
    navigate,
    updateSection,
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
    <PageLayout subtitle={data.name} title="Edit section">
      <SectionForm
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

export default SectionDetail;
