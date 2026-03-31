import AddIcon from "@mui/icons-material/Add";
import {
  Fab, styled,
} from "@mui/material";
import LinkBehavior from "../common/link/LinkBehavior";
import paths from "../../routes/paths";
import useRouteMatch from "../../hooks/useRouteMatch";

const StyledFab = styled(Fab)({
  bottom: "1rem",
  position: "absolute",
  right: "1rem",
});

const hideOnPaths = [
  paths.project.fullPath,
  paths.section.fullPath,
  paths.settings.fullPath,
  paths.task.fullPath,
  paths.newProject.fullPath,
  paths.newSection.fullPath,
  paths.newTask.fullPath,
];

const AddTaskFab = () => {
  if (useRouteMatch(hideOnPaths)) {
    return;
  }

  return (
    <StyledFab color="primary" href={paths.newTask.generate()} LinkComponent={LinkBehavior}>
      <AddIcon />
    </StyledFab>
  );
};

export default AddTaskFab;
