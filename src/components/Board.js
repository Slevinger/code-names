import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import Card from "./Card";

const Board = styled.div`
  display: block;
  width: 1200px;
  height: 550px;
  flex-wrap: wrap;
  flex-direction: row;
  display: flex;
  justify-content: center;
`;

export default ({ state, cellSelected }) => {
  const { board, whosTurn, teams, players, numberOfWords, player } = state;
  if (!player || !player.nickname) {
    return null;
  }
  const myTeamsTurn = whosTurn === player.teamColor;
  const countSelectedCells = teams[state.whosTurn].players
    .filter(nick => players[nick])
    .map(nick => players[nick].selectedCell)
    .reduce(
      (acc, cellIndexes) => ({
        ...acc,
        [cellIndexes]: (acc[cellIndexes] || 0) + 1
      }),
      {}
    );

  return (
    <div className="room-content">
      {Object.keys(state.players).length > 0 && (
        <Board>
          {Object.keys(board).map(key => {
            const player = state.players[state.nickname];
            const showColor = player.isHinter || board[key].showColor;
            return (
              <Card
                indexes={key}
                disabled={!numberOfWords && !myTeamsTurn}
                clickCount={countSelectedCells[key] || 0}
                playersCount={teams[state.whosTurn].players.length}
                teamColor={whosTurn}
                onClick={() => {
                  debugger;
                  whosTurn === player.teamColor && cellSelected(key);
                }}
                {...board[key]}
                {...{ showColor }}
              />
            );
          })}
        </Board>
      )}
    </div>
  );
};
