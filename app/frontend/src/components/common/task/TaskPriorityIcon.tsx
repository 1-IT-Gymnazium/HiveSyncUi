import {
  SvgIcon, SvgIconProps,
} from "@mui/material";
import {
  ForwardedRef, forwardRef,
} from "react";
import Honeycomb from "../../../assets/icons/honeycomb.svg?react";
import {
  TaskPriority, taskPriorityColors,
} from "../../pages/task/utils/taskPriorityEnum";

interface TaskPriorityIconProps extends SvgIconProps {
  priority: TaskPriority;
}

const TaskPriorityIcon = forwardRef((props: TaskPriorityIconProps, ref: ForwardedRef<SVGSVGElement>) => {
  const {
    priority, ...rest
  } = props;
  return <SvgIcon color={taskPriorityColors[priority]} component={Honeycomb} fontSize="inherit" ref={ref} {...rest} />;
});
TaskPriorityIcon.displayName = "TaskPriorityIcon";
export default TaskPriorityIcon;
