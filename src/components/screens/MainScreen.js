import React, { useEffect } from "react";
import MainRouter from "./MainRouter";
import useGame from "../../hooks/useGame";
import styled from "styled-components";

const CssWrapper = styled.div`
  button {
    padding: 10px;
    font-size: 20px;
    &:hover {
      cursor: pointer;
    }
  }
`;
export default () => {
  const gameHook = useGame();

  return (
    <CssWrapper>
      <MainRouter {...gameHook} />
    </CssWrapper>
  );
};
