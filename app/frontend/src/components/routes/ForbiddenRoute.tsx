import {
  Box, Typography,
} from "@mui/material";
import { useLayoutEffect } from "react";
import HivesyncCard from "../layout/HivesyncCard";
import ButtonLink from "../common/link/ButtonLink";
import paths from "../../routes/paths";
import useDocumentMeta from "../../context/documentMeta/useDocumentMeta";

const ForbiddenRoute = () => {
  const { setSectionName } = useDocumentMeta();

  useLayoutEffect(() => {
    setSectionName("Forbidden");

    return () => {
      setSectionName(null);
    };
  }, [setSectionName]);

  return (
    <Box alignItems="center" display="flex" justifyContent="center" minHeight="100vh" position="relative">
      <Box flex="0 1 auto" textAlign="center" width="300px">
        <HivesyncCard largeTitle>
          <Typography variant="h1">403</Typography>
          <Typography variant="subtitle1">Forbidden</Typography>
          <ButtonLink to={paths.basePath.generate()} variant="text">Leave</ButtonLink>
        </HivesyncCard>
      </Box>
    </Box>
  );
};

export default ForbiddenRoute;
