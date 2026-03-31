import {
  BottomNavigationAction, BottomNavigationActionProps,
} from "@mui/material";
import { forwardRef } from "react";
import { LinkProps } from "react-router";
import LinkBehavior from "./LinkBehavior";

export type BottomNavigationLinkProps = Omit<BottomNavigationActionProps, "href"> & {
  to: LinkProps["to"];
};

const BottomNavigationLink = forwardRef((props: BottomNavigationLinkProps, ref: React.Ref<HTMLButtonElement>) => {
  return (
    <BottomNavigationAction
      LinkComponent={LinkBehavior}
      ref={ref}
      {...props}
    />
  );
});

BottomNavigationLink.displayName = "BottomNavigationLink";

export default BottomNavigationLink;
