import React, { useEffect } from "react";
import axios from "../../apis/codeNameApi";
import Room from "./Room";

import LoginScreen from "./LoginScreen";
import useGame from "../../hooks/useGame";

export default () => {
  const hook = useGame();
  const {
    state: { nickname, gameId }
  } = hook;

  console.log(hook.state);
  return gameId && nickname ? <Room {...hook} /> : <LoginScreen {...hook} />;
};
