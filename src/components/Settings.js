import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { Button } from "./common/StyledComponents";

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
  .qlue {
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
      className="qlue"
      placeholder="Qlue"
    />
  ) : (
    <h2>{text}</h2>
  );
};

const NumberOfWords = ({ player: { isHinter }, numberOfWords }) => {
  debugger;
  return isHinter && !numberOfWords ? (
    <input type="text" className="qlue" placeholder="Word Count" />
  ) : (
    <h2>{numberOfWords}</h2>
  );
};

export default ({ state, setQlue, chooseTeam }) => {
  const { whosTurn, player, numberOfWords, qlue } = state;
  const [currentQlue, setCurrentQlue] = useState("");
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
          text={qlue}
          value={currentQlue}
          onValueChange={setCurrentQlue}
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
            setQlue(currentQlue, noOfWords);
          }}
        >
          submit
        </button>
      )}
    </Settings>
  );
};
