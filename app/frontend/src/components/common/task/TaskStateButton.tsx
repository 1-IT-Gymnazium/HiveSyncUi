import {
  Avatar, ModalProps, Popover,
  Stack,
} from "@mui/material";
import {
  MouseEventHandler, useCallback, useMemo, useState,
} from "react";
import {
  TaskState, taskStateHex, taskStateLabel, taskStateOptions,
} from "../../pages/task/utils/taskStateEnum";
import ColorChip from "../chip/ColorChip";
import RoundedTooltip from "../tooltip/RoundedTooltip";
import TaskStateIcon from "./TaskStateIcon";
interface TaskStateButtonProps {
  state: TaskState;
  onStateChange?: (
    state: TaskState
  ) => Promise<unknown>;
}

const TaskStateButton = ({
  state, onStateChange,
}: TaskStateButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleClick: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    if (onStateChange) {
      setAnchorEl((prevValue) => (!prevValue ? e.currentTarget : null));
    }
  }, [onStateChange]);

  const handleClose: ModalProps["onClose"] = () => {
    setAnchorEl(null);
  };

  const handleStateButtonClick = useCallback(async (_: React.MouseEvent<HTMLDivElement>, buttonState: TaskState) => {
    if (!onStateChange) {
      return;
    }
    await onStateChange(buttonState);
    setAnchorEl(null);
  }, [onStateChange]);

  const availableStates = useMemo(() => taskStateOptions.filter((opt) => opt !== state), [state]);
  return (
    <>
      <RoundedTooltip arrow enterTouchDelay={0} leaveTouchDelay={1500} placement="top" title={`State: ${taskStateLabel[state]}`}>
        <Avatar
          onClick={handleClick}
          sx={(theme) => ({
            backgroundColor: taskStateHex[state],
            boxShadow: `0px 3px 5px -1px #00000077, 0px 5px 8px 0px #00000054, 0px 1px 14px 0px #0000004A`,
            color: theme.palette.getContrastText(taskStateHex[state]),
            cursor: "pointer",
            fontSize: "1.85rem",
          })}
        >
          <TaskStateIcon currentState={state} />
        </Avatar>
      </RoundedTooltip>
      {!!onStateChange && (
        <Popover
          anchorEl={anchorEl}
          anchorOrigin={{
            horizontal: "center",
            vertical: "bottom",
          }}
          onClose={handleClose}
          open={!!anchorEl}
          slotProps={{
            paper: {
              sx: {
                background: "transparent",
                boxShadow: "none",
              },
            },
          }}
          transformOrigin={{
            horizontal: 25,
            vertical: -10,
          }}
        >
          <Stack spacing={1}>
            {availableStates.map((option) => (
              <ColorChip
                clickable
                customColor={taskStateHex[option]}
                fullWidth
                icon={<TaskStateIcon currentState={option} />}
                key={option}
                label={taskStateLabel[option]}
                onClick={(e) => { void handleStateButtonClick(e, option); }}
                size="small"
              />
            ))}
          </Stack>
        </Popover>
      )}
    </>
  );
};

export default TaskStateButton;
