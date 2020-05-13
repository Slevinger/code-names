import React from "react";
import { Route, Redirect } from "react-router-dom";

export default ({ children, hook, ...rest }) => {
  const { nickname, gameId } = hook.state;
  return (
    <Route {...rest}>
      {nickname ? children : <Redirect to={`/games/${gameId}`} />}
    </Route>
  );
};
