import {
  LinearProgress, List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import {
  useLayoutEffect,
} from "react";
import {
  Add, Inbox,
} from "@mui/icons-material";
import { useNavigate } from "react-router";
import AccordionListItem from "../../common/list/AccordionListItem";
import paths from "../../../routes/paths";
import theme from "../../../theme";
import { sectionQueryKey } from "../task/SearchFilter";
import useSections from "./hooks/useSections";

interface SectionListProps {
  projectId: string;
}

const SectionList = ({ projectId }: SectionListProps) => {
  const {
    getSections, deleteSection, data, loading,
  } = useSections(projectId);

  const navigate = useNavigate();

  useLayoutEffect(() => {
    void getSections();
  }, [getSections, projectId]);

  return (
    <>
      {loading && <LinearProgress />}
      <List>
        {data?.map((entry) => (
          <AccordionListItem
            color={entry.color !== "DEFAULT" ? entry.color : theme.palette.info.main}
            icon={<Inbox />}
            id={entry.id}
            key={entry.id}
            label={entry.name}
            onDelete={deleteSection}
            onEdit={async () => {
              await navigate(paths.section.generate({ id: entry.id }));
            }}
            onSearch={
              async () => {
                const params = new URLSearchParams();
                params.append(sectionQueryKey, entry.id);
                await navigate(paths.search.generate(params.toString()));
              }
            }
            renderChip
          />
        ))}
        <ListItemButton onClick={async () => {
          await navigate(paths.newSection.generate(), { state: { projectId } });
        }}
        >
          <ListItemText primary="Add new section" />
          <Add sx={{ marginRight: 1.25 }} />
        </ListItemButton>
      </List>
    </>
  );
};

export default SectionList;
