import {
  Card, CardActions, CardContent, CardHeader, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Menu, MenuItem, MenuList, Stack, styled,
} from "@mui/material";
import {
  useCallback,
  useState,
} from "react";
import {
  AllInbox,
  ArrowDropDown, ArrowDropUp, Inbox, MoreVert,
} from "@mui/icons-material";
import { formatDateTime } from "../../../utils/formatDate";
import {
  TaskState,
} from "../../pages/task/utils/taskStateEnum";
import { TodoDetailDto } from "../../../context/api";
import ColorChip from "../chip/ColorChip";
import theme from "../../../theme";
import RoundedButton from "../button/RoundedButton";
import { taskPriorityLabel } from "../../pages/task/utils/taskPriorityEnum";
import RoundedTooltip from "../tooltip/RoundedTooltip";
import TaskPriorityIcon from "./TaskPriorityIcon";
import TaskStateButton from "./TaskStateButton";

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: `${theme.palette.grey[900]} !important`,
  backgroundImage: "unset",
  border: `1px solid ${theme.palette.primary.dark}`,
  borderRadius: "10px",
  margin: ".5rem 0",
}));

interface TaskListItemProps {
  task: TodoDetailDto;
  onStateChange?: ({
    id, state,
  }: {
    id: string;
    state: TaskState;
  }) => Promise<unknown>;
  onEdit: (id: string) => unknown;
  onDelete: (id: string) => unknown;
}

const TaskListItem: React.FC<TaskListItemProps> = ({
  task,
  onStateChange,
  onEdit,
  onDelete,
}: TaskListItemProps) => {
  const {
    id, priority, state, dueAt, summary,
  } = task;
  const [detailOpen, setDetailOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleStateChange = useCallback(async (newState: TaskState) => {
    if (!onStateChange) {
      return Promise.resolve();
    }
    await onStateChange({
      id,
      state: newState,
    });
  }, [id, onStateChange]);

  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  const handleEdit = useCallback(() => {
    onEdit(id);
  }, [id, onEdit]);

  const toggleDetail = useCallback(() => {
    setDetailOpen((prevState) => !prevState);
  }, []);

  return (
    <StyledCard elevation={6}>
      <CardHeader
        action={(
          <Stack alignItems="center" direction="row" fontSize="1.5rem" gap={1}>
            <RoundedTooltip arrow enterTouchDelay={0} leaveTouchDelay={1500} placement="bottom" title={`Priority: ${taskPriorityLabel[priority]}`}>
              <TaskPriorityIcon priority={priority} />
            </RoundedTooltip>
            <IconButton aria-label="settings" onClick={(e) => { setAnchorEl((prev) => (!prev ? e.currentTarget : null)); }}>
              <MoreVert />
            </IconButton>
            <Menu anchorEl={anchorEl} onClose={() => { setAnchorEl(null); }} open={!!anchorEl}>
              <MenuList dense>
                <MenuItem onClick={handleEdit}>
                  Edit
                </MenuItem>
                <MenuItem onClick={() => { setShowDeleteDialog(true); }}>
                  Remove
                </MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        )}
        avatar={(
          <TaskStateButton onStateChange={handleStateChange} state={state} />
        )}
        slotProps={{ title: {
          component: "h3",
          variant: "h6",
        } }}
        subheader={!!dueAt && formatDateTime(dueAt)}
        title={summary}
      />
      <CardActions>
        <Grid alignItems="flex-end" container width="100%">
          <Grid size="grow">
            <Stack
              alignItems="flex-bottom"
              direction="row"
              flexWrap="wrap"
              gap={1}
              justifyContent="left"
            >
              <ColorChip customColor={task.project.color !== "DEFAULT" ? task.project.color : theme.palette.info.main} icon={<AllInbox />} label={task.project.name} size="small" />
              {task.section && <ColorChip customColor={task.section.color} icon={<Inbox />} label={task.section.name} size="small" />}
            </Stack>
          </Grid>
          {task.description && (
            <Grid alignSelf="flex-end" size="auto">
              <IconButton onClick={toggleDetail} sx={{ marginLeft: "auto" }}>
                {detailOpen ? <ArrowDropUp /> : <ArrowDropDown />}
              </IconButton>
            </Grid>
          )}
        </Grid>
      </CardActions>

      {task.description && (
        <Collapse in={detailOpen} timeout="auto" unmountOnExit>
          <CardContent>
            {task.description}
          </CardContent>
        </Collapse>
      )}
      <Dialog
        onClose={() => { setShowDeleteDialog(false); }}
        open={showDeleteDialog}
      >
        <DialogTitle>
          {`Delete task ${task.summary}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you really want to delete this task? This action is irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <RoundedButton onClick={() => { setShowDeleteDialog(false); }}>Cancel</RoundedButton>
          <RoundedButton autoFocus onClick={() => { handleDelete(); }} variant="contained">
            Continue
          </RoundedButton>
        </DialogActions>
      </Dialog>
    </StyledCard>

  );
};

export default TaskListItem;
