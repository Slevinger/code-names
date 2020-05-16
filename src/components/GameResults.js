import React from "react";
import styled from "styled-components";
import TeamScore from "./TeamScore";
const GameResult = styled.div`
  width: 70%;
  @media (max-width: 480px) {
    width: 100%;
  }
  .row {
    flex-direction: row;
    display: flex;
  }
`;

export default () => {
  return (
    <GameResult>
      <div className="row">
        <TeamScore teamColor="red" score={4} />
        <TeamScore teamColor="blue" score={2} />
      </div>
    </GameResult>
  );
};
