import React from "react";
import styled from "styled-components";
import PlayersList from "../PlayersList";
import TeamsContainer from "../TeamContainer";
import Board from "../Board";
import Settings from "../Settings";
import Chat from "../Chat";

const StyleRoom = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  background-color: ${({ teamColor }) =>
    teamColor && teamColor === "red"
      ? "rgba(200,0,0,0.2)"
      : teamColor && teamColor === "blue"
      ? "rgba(0,0,200,0.2)"
      : "none"};
  .room-content {
    align-items: center;
    flex: 5;
    display: flex;
    flex-direction: column;
    .game-title {
      font-size: 29px;
      width: 100%;
      padding-left: 60px;
      flex-direction: row;
      display: flex;
      padding-top: 10px;
      .qlue {
        padding: 5px;
        font-size: 18px;
      }
    }
  }
`;

export default hook => {
  const { state } = hook;
  const { players = [], board, player } = state;

  return (
    <StyleRoom {...player}>
      <PlayersList players={Object.values(players)} board={board} />
      <div className="room-content">
        {board ? <Board {...hook} /> : <TeamsContainer {...hook} />}
        <Chat nickname={hook.state.nickname} gameId={hook.state.gameId} />
      </div>
      <Settings {...hook} />
    </StyleRoom>
  );
};
