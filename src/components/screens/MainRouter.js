import React, { useEffect } from "react";
import axios from "../../apis/codeNameApi";
import Room from "./Room";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "../navigation/PrivateRoute";
import LoginScreen from "./LoginScreen";
import useGame from "../../hooks/useGame";

export default () => {
  const hook = useGame();
  const {
    history,
    state: { nickname, gameId }
  } = hook;
  useEffect(() => {
    if (gameId) {
      history.push(`/code-names/games/${gameId}`);
    }
  }, [gameId]);

  console.log(hook.state);

  return (
    <Router history={history}>
      <Switch>
        <Route path="/code-names/games">
          {gameId && nickname ? <Room {...hook} /> : <LoginScreen {...hook} />}
        </Route>
        <Route path="/code-names">
          <LoginScreen {...hook} />
        </Route>
      </Switch>
    </Router>
  );
};
