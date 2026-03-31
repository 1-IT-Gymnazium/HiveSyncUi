import {
  Grid,
} from "@mui/material";
import {
  ChangeEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

import RoundTextField from "../../common/input/RoundTextField";
import {
  ProjectDetailDto,
} from "../../../context/api";
import theme from "../../../theme";

export interface ProjectFormData {
  color: string;
  name: string;
}

interface ProjectFormProps {
  buttons?: ReactNode;
  data?: ProjectDetailDto;
  onValidChange?: (state: boolean) => void;
  onSubmit: (data: ProjectFormData) => Promise<void>;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  buttons, data, onValidChange, onSubmit,
}: ProjectFormProps) => {
  const [color, setColor] = useState(data?.color ?? theme.palette.primary.main);
  const [name, setName] = useState(data?.name ?? "");

  const handleSubmit = useCallback(async () => {
    if (!color.trim() || !name.trim()) {
      return;
    }

    await onSubmit({
      color,
      name,
    });
  }, [
    color,
    name,
    onSubmit,
  ]);

  const isValid = !!color.trim() && !!name.trim();

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
        <RoundTextField fullWidth label="Color" name="color" onChange={handleColorChange} type="color" value={color} />
      </Grid>
      <Grid pt={2} size={12}>
        {buttons}
      </Grid>
    </Grid>
  );
};

export default ProjectForm;
