import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { Button } from "./common/StyledComponents";
import Chat from "./Chat";

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
  .clue {
    padding: 5px;
    font-size: 18px;
  }
`;
const Input = ({ onValueChange, value, text, editMode }) => {
  return editMode ? (
    <input
      value={value}
      onChange={e => {
        onValueChange(e.currentTarget.value);
      }}
      type="text"
      className="clue"
      placeholder="Clue"
    />
  ) : (
    <h2>{text}</h2>
  );
};

export default ({ state, setClue, chooseTeam }) => {
  const { whosTurn, player, numberOfWords, clue } = state;
  const [currentClue, setCurrentClue] = useState("");
  const [noOfWords, setNoOfWords] = useState(0);
  const editMode = useMemo(() => {
    if (player && player.teamColor) {
      return player.isHinter && whosTurn === player.teamColor && !numberOfWords;
    }
  }, [whosTurn, player, numberOfWords]);
  return (
    <Settings>
      <div>
        <div className="settings-item">
          Go <span style={{ color: whosTurn }}>{whosTurn}</span> team
        </div>
      </div>

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

      {player && (
        <Input
          editMode={editMode}
          text={clue}
          value={currentClue}
          onValueChange={setCurrentClue}
          {...state}
        />
      )}
      {player && (
        <Input
          editMode={editMode}
          text={numberOfWords}
          value={noOfWords}
          onValueChange={setNoOfWords}
          {...state}
        />
      )}
      {!numberOfWords && editMode && (
        <button
          onClick={() => {
            setClue(currentClue, noOfWords);
          }}
        >
          submit
        </button>
      )}
      <Chat nickname={state.nickname} gameId={state.gameId} />
    </Settings>
  );
};
