import React from "react";
import styled from "styled-components";
import Player from "./Player";

const PlayersList = styled.div`
  flex: 1;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  max-width: 300px;
  .player {
    flex-direction: row;
    display: flex;
    line-height: 1.4rem;
    padding: 10px;
  }
  .player-name {
    flex: 1;
  }
  h1 {
    text-align: center;
  }
`;

export default ({ players, board = {} }) => {
  return (
    <PlayersList>
      <h1>Players</h1>
      {players.map(player => (
        <Player {...player} board={board} />
      ))}
    </PlayersList>
  );
};
