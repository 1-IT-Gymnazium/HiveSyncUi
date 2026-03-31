import {
  BottomNavigation,
  styled,
} from "@mui/material";
import TodayIcon from "@mui/icons-material/Today";
import SearchIcon from "@mui/icons-material/Search";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { Settings } from "@mui/icons-material";
import paths from "../../routes/paths";
import BottomNavigationLink from "../common/link/BottomNavigationLink";
import useRouteMatch from "../../hooks/useRouteMatch";

const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  boxShadow: theme.shadows[10],
}));

const routes = [
  paths.today.fullPath,
  paths.scheduled.fullPath,
  paths.search.fullPath,
  paths.settings.fullPath,
];

const Navigation = () => {
  const currentSection = useRouteMatch(routes);

  return (
    <StyledBottomNavigation showLabels value={currentSection}>
      <BottomNavigationLink
        icon={<TodayIcon />}
        label="Today"
        to={paths.today.generate()}
        value={paths.today.fullPath}
      />
      <BottomNavigationLink
        icon={<ScheduleIcon />}
        label="Scheduled"
        to={paths.scheduled.generate()}
        value={paths.scheduled.fullPath}
      />
      <BottomNavigationLink
        icon={<SearchIcon />}
        label="Search"
        to={paths.search.generate()}
        value={paths.search.fullPath}
      />
      <BottomNavigationLink
        icon={<Settings />}
        label="Settings"
        to={paths.settings.generate()}
        value={paths.settings.fullPath}
      />
    </StyledBottomNavigation>
  );
};

export default Navigation;
