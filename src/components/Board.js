import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import Card from "./Card";

const Board = styled.div`
  display: block;
  @media (min-width: 920px) {
    min-width: 900px;
  }
  flex-wrap: wrap;
  flex-direction: row;
  display: flex;
  justify-content: center;
`;

export default ({ state, cellSelected }) => {
  const {
    board,
    whosTurn,
    teams,
    players,
    numberOfWords,
    player,
    clue
  } = state;
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
    <div>
      {Object.keys(state.players).length > 0 && (
        <Board>
          {Object.keys(board).map(key => {
            const player = state.players[state.nickname];
            const showColor = player.isHinter || board[key].showColor;
            console.log("clue", clue);
            return (
              <Card
                indexes={key}
                disabled={!numberOfWords || !myTeamsTurn || !clue}
                clickCount={countSelectedCells[key] || 0}
                playersCount={teams[state.whosTurn].players.length}
                teamColor={whosTurn}
                disabled={player.teamColor !== whosTurn || player.isHinter}
                onClick={() => {
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
