import {
  Box,
  Container,
  Grid,
  Paper,
  styled,
} from "@mui/material";
import {
  Outlet,
} from "react-router";
import useUserStore from "../../stores/useUserStore";
import Navigation from "./Navigation";
import AddTaskFab from "./AddTaskFab";

const StyledContainer = styled(Container)({
  height: "100%",
});

const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  minHeight: "100dvh",
  overflow: "hidden",
  width: "100%",
});

const StyledPaper = styled(Paper)({
  position: "relative",
});

const Layout: React.FC = () => {
  const userDetail = useUserStore((state) => state.userDetail);

  return userDetail
    ? (
      <StyledBox>
        <Grid flexShrink={1} minHeight="0" position="relative" size="grow">
          <Box height="100%" maxHeight="100%" overflow="auto">
            <StyledContainer fixed maxWidth="lg">
              <Box height="100%">
                <Outlet />
              </Box>
            </StyledContainer>
          </Box>
          <AddTaskFab />
        </Grid>
        <Grid size="auto">
          <StyledPaper
            elevation={3}
          >
            <Navigation />
          </StyledPaper>
        </Grid>
      </StyledBox>
    )
    : (
      <Outlet />
    );
};

export default Layout;
