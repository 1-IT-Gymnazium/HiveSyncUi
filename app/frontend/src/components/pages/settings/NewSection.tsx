import {
  useCallback, useState,
} from "react";
import { useNavigate } from "react-router";
import { Stack } from "@mui/material";
import PageLayout from "../../layout/PageLayout";
import RoundedButton from "../../common/button/RoundedButton";
import SectionForm, { SectionFormData } from "./SectionForm";
import useSectionDetail from "./hooks/useSectionDetail";

const NewSection = () => {
  const navigate = useNavigate();
  const {
    createSection,
    creating,
  } = useSectionDetail();
  const [canSubmit, setCanSubmit] = useState(false);

  const handleSubmit = useCallback(async (data: SectionFormData) => {
    const success = await createSection({
      addSectionDto: {
        color: data.color.trim(),
        name: data.name.trim(),
        projectId: data.projectId.trim(),
      },
    });
    if (success) {
      await navigate(-1);
    }
  }, [createSection, navigate]);

  return (
    <PageLayout title="New section">
      <SectionForm
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

export default NewSection;
