import React, { useEffect } from "react";
import MainRouter from "./MainRouter";
import useGame from "../../hooks/useGame";

export default () => {
  const gameHook = useGame();

  return (
    <div>
      <MainRouter {...gameHook} />
    </div>
  );
};
