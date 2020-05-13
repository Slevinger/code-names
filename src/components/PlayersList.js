import React from "react";
import styled from "styled-components";
import DoneIcon from "@material-ui/icons/Done";

const PlayersList = styled.div`
  flex: 1;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
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

const Player = ({ nickname, isReady, ...props }) => (
  <div className="player">
    <div className="player-name">{nickname}</div>
    {isReady && <DoneIcon style={{ color: "green" }} />}
  </div>
);

export default ({ players }) => {
  return (
    <PlayersList>
      <h1>Players</h1>
      {players.map(player => (
        <Player {...player} />
      ))}
    </PlayersList>
  );
};
