import {
  Check, EmojiNature, PlayArrow,
} from "@mui/icons-material";
import {
  ForwardedRef,
  forwardRef, useMemo,
} from "react";
import { SvgIconProps } from "@mui/material";
import { TaskState } from "../../pages/task/utils/taskStateEnum";

interface TaskStateIconProps extends SvgIconProps {
  currentState: TaskState;
}

const TaskStateIcon = forwardRef((props: TaskStateIconProps, ref: ForwardedRef<SVGSVGElement>) => {
  const {
    currentState, ...rest
  } = props;

  const icon = useMemo(() => {
    switch (currentState) {
      case TaskState.Done:
        return <Check color="inherit" fontSize="inherit" ref={ref} {...rest} />;
      case TaskState.InProgress:
        return <PlayArrow color="inherit" fontSize="inherit" ref={ref} {...rest} />;
      case TaskState.ToDo:
      default:
        return <EmojiNature color="inherit" fontSize="inherit" ref={ref} {...rest} />;
    }
  }, [
    currentState,
    ref,
    rest,
  ]);

  return icon;
});

TaskStateIcon.displayName = "TaskStateIcon";
export default TaskStateIcon;
