import { forwardRef } from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

const LinkBehavior = forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
  const {
    href, ...restOfProps
  } = props;
  return <RouterLink ref={ref} to={href} {...restOfProps} />;
});

LinkBehavior.displayName = "LinkBehavior";

export default LinkBehavior;
