import React, { useMemo } from "react";
import styled, { css } from "styled-components";

const Board = styled.div`
  display: block;
  width: 1200px;
  height: 550px;
  flex-wrap: wrap;
  flex-direction: row;
  display: flex;
  justify-content: center;
`;

const StyledCard = styled.div`
  background-color: ${({ showColor, color }) =>
    showColor ? color : "rgba(0,0,0,0.2)"};
  width: 200px;
  height: 100px;
  border-radius: 14px;
  border: solid thin;
  flex-direction: column;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ disabled }) => {
    return (
      disabled &&
      css`
        pointer-events: hover;
      `
    );
  }}
  &:hover {
    cursor: pointer;
    background-color: lightgrey;
  }
`;

const ColorBox = styled.div`
  position: relative;
  width: 60%;
  height: 25px;
  background-color: white;
  border: 1px solid;
  .word {
    position: absolute;
    z-index: 1;
    height: 100%;
    width: 100%;
    text-align: center;
  }
`;

const ProgressBar = styled.div`
  position: relative;
  height: 100%;
  ${({ teamColor, flipTeam, clickCount, playersCount }) => {
    let backgroundColor = "white";
    let pcnt = 100;
    if (flipTeam) {
      backgroundColor = flipTeam;
    } else {
      if (clickCount > 0) {
        backgroundColor = teamColor;
        pcnt = Math.round((clickCount / playersCount) * 100);
      }
    }
    return css`
      background-color: ${backgroundColor};
      width: ${pcnt}%;
    `;
  }}
`;

const Card = ({ indexes, onClick, teamColor, ...card }) => {
  return (
    <StyledCard key={indexes} {...card} onClick={onClick}>
      <ColorBox {...card}>
        <div className={"word"}>{card.word}</div>
        <ProgressBar teamColor={teamColor} {...card} />
      </ColorBox>
    </StyledCard>
  );
};

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
