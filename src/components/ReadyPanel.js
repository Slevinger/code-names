import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { DEFAULT_ECDH_CURVE } from "tls";

const Container = styled.div`
  width: 200px;
  height: 100px;
  border: 1px solid;
  flex-direction: column;
  display: flex;
  margin: 5px;
  text-align: center;
  align-items: center;

  button {
    padding: 10px;
    font-size: 20px;
    ${({ readyToStart }) =>
      !readyToStart &&
      css`
        opacity: 0.7;
        pointer-events: none;
      `};
  }
`;

export default ({
  teamColor,
  isReady,
  toggleReady,
  startGame,
  game,
  ...player
}) => {
  const areAllPlayersReady = useMemo(() => {
    const { players } = game;
    debugger;
    const ready =
      Object.values(players).filter(player => !player.isReady).length === 0;
    return ready;
  }, [game.players]);

  const isThereHinterForEachTeam = useMemo(() => {
    const { players, teams } = game;
    debugger;
    const teamHinterMap = Object.keys(teams).reduce(
      (acc, teamColor) => ({ ...acc, [teamColor]: false }),
      {}
    );
    Object.values(players).forEach(player => {
      if (player.teamColor && player.isHinter) {
        teamHinterMap[player.teamColor] = true;
      }
    });
    return Object.values(teamHinterMap).reduce(
      (acc, isHinter) => acc && isHinter,
      true
    );
  }, [game.players, game.teams]);

  const isThereGuesserForEachTeam = useMemo(() => {
    const { players, teams } = game;
    return Object.keys(teams).reduce((acc, teamColor) => {
      return acc && teams[teamColor].players.length > 0;
    }, true);
  }, [game.players]);

  const readyToStart = areAllPlayersReady; // && isThereGuesserForEachTeam && isThereHinterForEachTeam;
  debugger;
  // const canPlayerStartGame = useMemo(,[])
  return (
    <Container readyToStart={readyToStart}>
      <FormControlLabel
        control={
          <Switch
            checked={isReady}
            disabled={!teamColor}
            onChange={() => {
              toggleReady(player.nickname);
            }}
          />
        }
        label="Ready"
      />
      {
        <button
          onClick={() => {
            console.log("start game");
            startGame && startGame();
          }}
        >
          start
        </button>
      }
    </Container>
  );
};
