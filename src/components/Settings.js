import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { Button } from "./common/StyledComponents";
import Chat from "./Chat";
import TeamScore from "./TeamScore";
import isEmpty from "lodash/isEmpty";

const Settings = styled.div`
  text-align: center;
  flex: 2;
  padding-top: 10px;
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  .settings-item {
    font-size: 19px;
  }

  input {
    padding: 5px;
    font-size: 18px;
    margin: 5px;
  }
`;
const Input = ({ onValueChange, value, text, editMode, placeholder }) => {
  return editMode ? (
    <input
      value={value}
      onChange={e => {
        onValueChange(e.currentTarget.value);
      }}
      type="text"
      placeholder={placeholder}
    />
  ) : (
    <h2>{text}</h2>
  );
};

export default ({ state, setClue, chooseTeam, leaveGame }) => {
  const { whosTurn, player, numberOfWords, clue, teams, board } = state;
  const [currentClue, setCurrentClue] = useState("");
  const [noOfWords, setNoOfWords] = useState("");
  const editMode = useMemo(() => {
    if (player && player.teamColor) {
      return player.isHinter && whosTurn === player.teamColor && !numberOfWords;
    }
  }, [whosTurn, player, numberOfWords]);
  debugger;
  return (
    <Settings>
      <div className="settings-item">
        Go <span style={{ color: whosTurn }}>{whosTurn}</span> team
      </div>
      {board && (
        <div>
          <Button
            onClick={() => {
              chooseTeam("red", player.isHinter ? "hinter" : "guesser");
            }}
            bgColor={"rgba(244,100,100,0.4)"}
          >
            Join Red Team
          </Button>
          <Button
            onClick={() => {
              chooseTeam("blue", player.isHinter ? "hinter" : "guesser");
            }}
            bgColor={"rgba(100,100,244,0.4)"}
          >
            Join Blue Team
          </Button>
        </div>
      )}

      {player && (
        <Input
          editMode={editMode}
          text={clue}
          value={currentClue}
          onValueChange={setCurrentClue}
          placeholder={"Clue"}
          {...state}
        />
      )}
      {player && (
        <Input
          editMode={editMode}
          text={numberOfWords}
          value={noOfWords}
          onValueChange={setNoOfWords}
          placeholder={"No Of Words"}
          {...state}
        />
      )}
      {!numberOfWords && editMode && (
        <Button
          onClick={() => {
            setClue(currentClue, noOfWords);
            setCurrentClue("");
            setNoOfWords("");
          }}
        >
          submit
        </Button>
      )}
      {board && (
        <div style={{ display: "flex", flexDirection: "row" }}>
          {Object.keys(teams).map(teamColor => (
            <TeamScore teamColor={teamColor} score={teams[teamColor].score} />
          ))}
        </div>
      )}
      <Chat nickname={state.nickname} gameId={state.gameId} />
      <Button
        onClick={() => {
          leaveGame();
        }}
      >
        logout
      </Button>
    </Settings>
  );
};
