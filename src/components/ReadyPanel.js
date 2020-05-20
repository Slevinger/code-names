import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Button } from "./common/StyledComponents";

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
    &:hover {
      cursor: pointer;
    }
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

    const ready =
      Object.values(players).filter(player => !player.isReady).length === 0;
    return ready;
  }, [game.players]);

  const isThereHinterForEachTeam = useMemo(() => {
    const { players, teams } = game;

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

  // const canPlayerStartGame = useMemo(,[])
  return (
    <Container>
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
        <Button
          disabled={!readyToStart}
          onClick={() => {
            if (readyToStart) {
              console.log("start game");
              startGame && startGame();
            }
          }}
        >
          start
        </Button>
      }
    </Container>
  );
};
