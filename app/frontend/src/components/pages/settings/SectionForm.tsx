import {
  Grid,
} from "@mui/material";
import {
  ChangeEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

import { AllInbox } from "@mui/icons-material";
import { useLocation } from "react-router";
import RoundTextField from "../../common/input/RoundTextField";
import {
  SectionDetailDto,
} from "../../../context/api";
import useProjectOptions from "../task/hooks/useProjectOptions";
import ChipSelect from "../../common/input/ChipSelect";
import ChipSelectOption from "../../common/chip/ChipSelectOption";
import theme from "../../../theme";

const isStateWithProjectId = (state: unknown): state is { projectId: string } => {
  return !!state && typeof state === "object" && "projectId" in state && typeof state.projectId === "string";
};

export interface SectionFormData {
  color: string;
  name: string;
  projectId: string;
}

interface ProjectFormProps {
  buttons?: ReactNode;
  data?: SectionDetailDto;
  onValidChange?: (state: boolean) => void;
  onSubmit: (data: SectionFormData) => Promise<void>;
}

const SectionForm: React.FC<ProjectFormProps> = ({
  buttons, data, onValidChange, onSubmit,
}: ProjectFormProps) => {
  const location = useLocation();
  const {
    data: projectOptions, getProjects, loading: projectOptionsLoading,
  } = useProjectOptions();

  const [color, setColor] = useState(data?.color ?? theme.palette.primary.main);
  const [name, setName] = useState(data?.name ?? "");
  const [project, setProject] = useState<ChipSelectOption | null>(null);

  useLayoutEffect(() => {
    void getProjects().then((projectOpts) => {
      const state = location.state as unknown;
      if (isStateWithProjectId(state)) {
        const locationStateProject = projectOpts?.find((opt) => (state.projectId === opt.value));
        if (locationStateProject) {
          setProject(locationStateProject);
          return;
        }
      }
      const defaultProject = projectOpts?.find((opt) => (data ? data.project.id === opt.value : opt.default));
      if (defaultProject) {
        setProject(defaultProject);
      }
    });
  }, [
    data,
    getProjects,
    location.state,
  ]);

  const handleSubmit = useCallback(async () => {
    if (!color.trim() || !name.trim() || !project) {
      return;
    }

    await onSubmit({
      color,
      name,
      projectId: project.value,
    });
  }, [
    color,
    name,
    onSubmit,
    project,
  ]);

  const isValid = !!color.trim() && !!name.trim() && !!project;

  useEffect(() => {
    if (onValidChange) {
      onValidChange(isValid);
    }
  }, [isValid, onValidChange]);

  const handleColorChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setColor(e.target.value);
  }, []);

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setName(e.target.value);
  }, []);

  return (
    <Grid action={handleSubmit} component="form" container gap={2}>
      <Grid size={12}>
        <RoundTextField fullWidth label="Name *" name="name" onChange={handleNameChange} value={name} />
      </Grid>
      <Grid size={12}>
        <RoundTextField fullWidth label="Color *" name="color" onChange={handleColorChange} type="color" value={color} />
      </Grid>
      <Grid size={12}>
        <ChipSelect
          clearable
          fullWidth
          icon={<AllInbox />}
          label="Project *"
          loading={projectOptionsLoading}
          onChange={setProject}
          options={projectOptions}
          value={project}
        />
      </Grid>
      <Grid pt={2} size={12}>
        {buttons}
      </Grid>
    </Grid>
  );
};

export default SectionForm;
