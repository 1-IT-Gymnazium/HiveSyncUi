import {
  Grid,
  Stack,
  SvgIcon,
} from "@mui/material";
import {
  ChangeEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  AllInbox, Inbox,
} from "@mui/icons-material";
import Honeycomb from "../../../assets/icons/honeycomb.svg?react";
import RoundTextField from "../../common/input/RoundTextField";
import DateTimePicker from "../../common/input/DateTimePicker";
import ChipSelect from "../../common/input/ChipSelect";
import TaskPriorityIcon from "../../common/task/TaskPriorityIcon";
import ChipSelectOption from "../../common/chip/ChipSelectOption";
import TaskStateIcon from "../../common/task/TaskStateIcon";
import { TodoDetailDto } from "../../../context/api";
import useProjectOptions from "./hooks/useProjectOptions";
import {
  getTaskPriorityChipOption,
  isTaskPriorityEnum, TaskPriority, taskPriorityChipOptions,
} from "./utils/taskPriorityEnum";
import {
  getTaskStateChipOption,
  isTaskStateEnum, TaskState, taskStateChipOptions,
} from "./utils/taskStateEnum";
import useSectionOptions from "./hooks/useSectionOptions";

export interface TaskFormData {
  summary: string;
  description?: string;
  dueAt?: Dayjs;
  projectId: string;
  sectionId?: string;
  priorityId: TaskPriority;
  stateId: TaskState;
}

interface TaskFormProps {
  buttons?: ReactNode;
  data?: TodoDetailDto;
  onValidChange?: (state: boolean) => void;
  onSubmit: (data: TaskFormData) => Promise<void>;
}

const taskStateExtendedOpts = taskStateChipOptions.map((opt) => ({
  ...opt,
  icon: <TaskStateIcon currentState={opt.value as TaskState} fontSize="medium" />,
}));

const taskPriorityExtendedOpts = taskPriorityChipOptions.map((opt) => ({
  ...opt,
  icon: <TaskPriorityIcon fontSize="small" priority={opt.value as TaskPriority} />,
}));

const TaskForm: React.FC<TaskFormProps> = ({
  buttons, data, onValidChange, onSubmit,
}: TaskFormProps) => {
  const {
    data: projectOptions, getProjects, loading: projectOptionsLoading,
  } = useProjectOptions();
  const {
    data: sectionOptions, getSections, loading: sectionOptionsLoading,
  } = useSectionOptions();

  const [summary, setSummary] = useState(data?.summary ?? "");
  const [priority, setPriority] = useState<ChipSelectOption | null>(getTaskPriorityChipOption(data?.priority ?? TaskPriority.Medium));
  const [state, setState] = useState<ChipSelectOption | null>(getTaskStateChipOption(data?.state ?? TaskState.ToDo));
  const [project, setProject] = useState<ChipSelectOption | null>(null);
  const [section, setSection] = useState<ChipSelectOption | null>(null);
  const [dueAt, setDueAt] = useState<Dayjs | null>(data?.dueAt ? dayjs(data.dueAt) : null);

  useLayoutEffect(() => {
    void getProjects().then((projectOpts) => {
      const defaultProject = projectOpts?.find((opt) => (data ? data.project.id === opt.value : opt.default));
      if (defaultProject) {
        setProject(defaultProject);
      }
    });
  }, [data, getProjects]);

  useLayoutEffect(() => {
    if (project) {
      void getSections(project.value).then((sectionOpts) => {
        if (project.value !== data?.project.id) {
          return;
        }
        const selectedSection = sectionOpts?.find((opt) => opt.value === data.section?.id);
        if (selectedSection) {
          setSection(selectedSection);
        }
      });
    }
  }, [
    data?.project.id,
    data?.section?.id,
    getSections,
    project,
  ]);

  const handleSubmit = useCallback(async (formData: FormData) => {
    const description = formData.get("description");
    const priorityId = priority?.value;
    const stateId = state?.value;

    if (!isTaskPriorityEnum(priorityId) || !project || !isTaskStateEnum(stateId) || typeof summary !== "string" || !summary.trim()) {
      return;
    }

    await onSubmit({
      description: typeof description === "string" ? description.trim() : undefined,
      dueAt: dueAt ?? undefined,
      priorityId,
      projectId: project.value,
      sectionId: section?.value,
      stateId,
      summary,
    });
  }, [
    dueAt,
    onSubmit,
    priority?.value,
    project,
    section?.value,
    state?.value,
    summary,
  ]);

  const isValid = isTaskPriorityEnum(priority?.value) && !!project && isTaskStateEnum(state?.value) && !!summary.trim();

  useEffect(() => {
    if (onValidChange) {
      onValidChange(isValid);
    }
  }, [isValid, onValidChange]);

  const handleSummaryChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setSummary(e.target.value);
  }, []);

  return (
    <Grid action={handleSubmit} component="form" container gap={2}>
      <Grid size={12}>
        <RoundTextField fullWidth label="Summary *" name="summary" onChange={handleSummaryChange} value={summary} />
      </Grid>
      <Grid size={12}>
        <Stack direction="row" gap={2} justifyContent="space-between">
          <ChipSelect
            fullWidth
            icon={state?.value ? <TaskStateIcon currentState={state.value as TaskState} fontSize="medium" /> : undefined}
            invertOptionColor
            label="State"
            onChange={setState}
            options={taskStateExtendedOpts}
            value={state}
          />
          <ChipSelect
            fullWidth
            icon={priority?.value ? <SvgIcon component={Honeycomb} fontSize="small" /> : undefined}
            invertOptionColor
            label="Priority"
            onChange={setPriority}
            options={taskPriorityExtendedOpts}
            value={priority}
          />
        </Stack>
      </Grid>
      <Grid size={12}>
        <DateTimePicker label="Due at" onChange={(val) => { setDueAt(val); }} value={dueAt} />
      </Grid>
      <Grid size={12}>
        <RoundTextField defaultValue={data?.description} fullWidth label="Description" minRows={3} multiline name="description" />
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
      <Grid size={12}>
        <ChipSelect
          clearable
          fullWidth
          icon={<Inbox />}
          label="Section"
          loading={sectionOptionsLoading}
          onChange={setSection}
          options={sectionOptions}
          value={section}
        />
      </Grid>
      <Grid pt={2} size={12}>
        {buttons}
      </Grid>
    </Grid>
  );
};

export default TaskForm;
