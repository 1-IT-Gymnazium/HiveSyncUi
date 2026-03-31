import {
  LinearProgress, List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import {
  useLayoutEffect,
} from "react";
import {
  Add, AllInbox,
} from "@mui/icons-material";
import { useNavigate } from "react-router";
import AccordionListItem from "../../common/list/AccordionListItem";
import paths from "../../../routes/paths";
import theme from "../../../theme";
import { projectQueryKey } from "../task/SearchFilter";
import useProjects from "./hooks/useProjects";
import SectionList from "./SectionList";

const ProjectList = () => {
  const {
    getProjects, deleteProject, data, loading,
  } = useProjects();

  const navigate = useNavigate();

  useLayoutEffect(() => {
    void getProjects();
  }, [getProjects]);

  return (
    <>
      {loading && <LinearProgress />}
      <List>
        {data?.map((entry) => (
          <AccordionListItem
            color={entry.color !== "DEFAULT" ? entry.color : theme.palette.info.main}
            icon={<AllInbox />}
            id={entry.id}
            key={entry.id}
            label={entry.name}
            onDelete={deleteProject}
            onEdit={async () => {
              await navigate(paths.project.generate({ id: entry.id }));
            }}
            onSearch={
              async () => {
                const params = new URLSearchParams();
                params.append(projectQueryKey, entry.id);
                await navigate(paths.search.generate(params.toString()));
              }
            }
            renderChip
          >
            <SectionList projectId={entry.id} />
          </AccordionListItem>
        ))}
        <ListItemButton onClick={async () => {
          await navigate(paths.newProject.generate());
        }}
        >
          <ListItemText primary="Add new project" />
          <Add sx={{ marginRight: 1.25 }} />
        </ListItemButton>
      </List>
    </>
  );
};

export default ProjectList;
