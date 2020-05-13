import React from "react";
import { Button } from "@material-ui/core";

export const NavButton = mobxConnect(({ navigationStore: { push } }) => {
  return {
    push
  };
})(({ push, to, children, ...rest }) => (
  <Button
    {...rest}
    onClick={() => {
      push(to);
    }}
  >
    {children}
  </Button>
));
