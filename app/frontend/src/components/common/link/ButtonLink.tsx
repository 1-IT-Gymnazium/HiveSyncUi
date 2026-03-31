import {
  ButtonProps,
} from "@mui/material";
import { forwardRef } from "react";
import { LinkProps } from "react-router";
import RoundedButton from "../button/RoundedButton";
import LinkBehavior from "./LinkBehavior";

export type ButtonLinkProps = Omit<ButtonProps, "href"> & {
  to: LinkProps["to"];
};

const ButtonLink = forwardRef((props: ButtonLinkProps, ref: React.Ref<HTMLButtonElement>) => {
  return (
    <RoundedButton
      LinkComponent={LinkBehavior}
      ref={ref}
      {...props}
    />
  );
});

ButtonLink.displayName = "ButtonLink";

export default ButtonLink;
