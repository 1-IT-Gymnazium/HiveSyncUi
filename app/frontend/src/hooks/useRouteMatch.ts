import {
  matchPath, useLocation,
} from "react-router";

const useRouteMatch = (patterns: readonly string[]) => {
  const { pathname } = useLocation();

  const match = patterns.find((pattern) => matchPath({
    end: false,
    path: pattern,
  }, pathname)) ?? null;

  return match;
};

export default useRouteMatch;
