import React, { useMemo } from "react";
import styled from "styled-components";
import ReadyPanel from "./ReadyPanel";

const StyeldTeamsContainer = styled.div`
  width: 60%;
  height: 400px;
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  div {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .red-team {
    background-color: rgba(100, 0, 0, 0.5);
  }
  .blue-team {
    background-color: rgba(0, 0, 100, 0.5);
  }

  .guesser {
    flex: 2;
    position: relative;
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
      cursor: pointer;
    }
  }
  .hinter {
    flex: 1;
    position: relative;
    background-color: rgba(0, 0, 0, 0.2);
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      cursor: pointer;
    }
  }
`;

const BgTitle = ({ title, ...props }) => {
  return <div className="bg-title">{title}</div>;
};

export default ({
  chooseTeam,
  state,
  togglePlayerReady,
  startGame,
  leaveGame
}) => {
  const { players, nickname } = state;
  const currentPlayer = players[nickname];

  const teams = useMemo(
    () =>
      Object.values(players)
        .filter(({ teamColor }) => teamColor)
        .reduce(
          (acc, player) => {
            acc[player.teamColor][
              player.isHinter ? "hinters" : "guessers"
            ].push(player.nickname);
            return acc;
          },
          {
            red: { hinters: [], guessers: [] },
            blue: { hinters: [], guessers: [] }
          }
        ),
    [players]
  );
  return (
    <>
      <StyeldTeamsContainer>
        <div className="blue-team">
          <div
            className="guesser"
            onClick={() => {
              chooseTeam("blue", "guesser");
            }}
          >
            <BgTitle title={"GUESSERS"} />
            {teams.blue.guessers.map(nickname => (
              <div>{nickname}</div>
            ))}
          </div>
          <div
            className="hinter"
            onClick={() => {
              chooseTeam("blue", "hinter");
            }}
          >
            <BgTitle title={"HINTERS"} />
            {teams.blue.hinters.map(nickname => (
              <div>{nickname}</div>
            ))}
          </div>
        </div>
        <div className="red-team">
          <div
            className="guesser"
            onClick={() => {
              chooseTeam("red", "guesser");
            }}
          >
            <BgTitle title={"GUESSERS"} />
            {teams.red.guessers.map(nickname => (
              <div>{nickname}</div>
            ))}
          </div>
          <div
            className="hinter"
            onClick={() => {
              chooseTeam("red", "hinter");
            }}
          >
            <BgTitle title={"HINTERS"} />
            {teams.red.hinters.map(nickname => (
              <div>{nickname}</div>
            ))}
          </div>
        </div>
      </StyeldTeamsContainer>
      <ReadyPanel
        {...currentPlayer}
        game={state}
        toggleReady={togglePlayerReady}
        startGame={startGame}
      />
    </>
  );
};
