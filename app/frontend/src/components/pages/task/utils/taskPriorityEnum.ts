import {
  SvgIconProps,
} from "@mui/material";
import { TodoPriority as TaskPriority } from "../../../../context/api";
import isEnumGenerator from "../../../../utils/enum/isEnumGenerator";
import ChipSelectOption from "../../../common/chip/ChipSelectOption";
import theme from "../../../../theme";

const isTaskPriorityEnum = isEnumGenerator(TaskPriority);

const taskPriorityLabel: Record<TaskPriority, string> = {
  [TaskPriority.High]: "High",
  [TaskPriority.Low]: "Low",
  [TaskPriority.Medium]: "Medium",
};

const taskPriorityColors: Record<TaskPriority, SvgIconProps["color"]> = {
  [TaskPriority.High]: "error",
  [TaskPriority.Medium]: "warning",
  [TaskPriority.Low]: "info",
};

const taskPriorityHex: Record<TaskPriority, string> = {
  [TaskPriority.High]: theme.palette.error.main,
  [TaskPriority.Low]: theme.palette.info.main,
  [TaskPriority.Medium]: theme.palette.warning.main,
};

const taskPriorityOptions = Array.from(Object.values(TaskPriority));

const getTaskPriorityChipOption: (priority: TaskPriority) => ChipSelectOption = (priority) => ({
  color: taskPriorityHex[priority],
  label: taskPriorityLabel[priority],
  value: priority,
});

const taskPriorityChipOptions: ChipSelectOption[] = taskPriorityOptions.map(getTaskPriorityChipOption);

export {
  getTaskPriorityChipOption,
  isTaskPriorityEnum,
  taskPriorityColors,
  taskPriorityLabel,
  taskPriorityOptions,
  taskPriorityChipOptions,
  TaskPriority,
};
