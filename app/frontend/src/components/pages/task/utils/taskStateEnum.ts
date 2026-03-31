import {
  ButtonProps,
} from "@mui/material";
import { TodoState as TaskState } from "../../../../context/api";
import isEnumGenerator from "../../../../utils/enum/isEnumGenerator";
import theme from "../../../../theme";
import ChipSelectOption from "../../../common/chip/ChipSelectOption";

const isTaskStateEnum = isEnumGenerator(TaskState);

const taskStateLabel: Record<TaskState, string> = {
  [TaskState.Done]: "Done",
  [TaskState.InProgress]: "In progress",
  [TaskState.ToDo]: "To do",
};

const taskStateOptions = Array.from(Object.values(TaskState));

const taskStateColors: Record<TaskState, ButtonProps["color"]> = {
  [TaskState.Done]: "success",
  [TaskState.InProgress]: "info",
  [TaskState.ToDo]: "warning",
};

const taskStateHex: Record<TaskState, string> = {
  [TaskState.Done]: theme.palette.success.main,
  [TaskState.InProgress]: theme.palette.info.main,
  [TaskState.ToDo]: theme.palette.warning.main,
};

const getTaskStateChipOption: (state: TaskState) => ChipSelectOption = (state) => ({
  color: taskStateHex[state],
  label: taskStateLabel[state],
  value: state,
});

const taskStateChipOptions: ChipSelectOption[] = taskStateOptions.map(getTaskStateChipOption);

export {
  TaskState,
  getTaskStateChipOption,
  isTaskStateEnum,
  taskStateColors,
  taskStateHex,
  taskStateLabel,
  taskStateOptions,
  taskStateChipOptions,
};
