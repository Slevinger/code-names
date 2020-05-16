import React, { useState } from "react";
import PlayersList from "../components/PlayersList";
import { Button } from "../components/common/StyledComponents";
import OptionsBox from "../components/common/OptionsBox";

export default {
  title: "Player",
  component: PlayersList
};
const initalState = {
  nickname: "slevinger",
  isReady: false,
  selectedCell: false,
  isHinter: true,
  teamColor: "blue"
};

const board = {
  ["0,0"]: {
    color: "white",
    showColor: false,
    word: "מעבדה"
  }
};
export const PlayerItem = () => {
  const [player, setPlayer] = useState(initalState);
  const { isReady, selectedCell } = player;
  return (
    <>
      <PlayersList players={[player]} board={board} />
      <OptionsBox>
        <Button
          onClick={() => {
            setPlayer({ ...player, isReady: !isReady });
          }}
        >
          setReady
        </Button>
        <Button
          onClick={() => {
            setPlayer({
              ...player,
              selectedCell: selectedCell ? false : "0,0"
            });
          }}
        >
          setSelected
        </Button>
      </OptionsBox>
    </>
  );
};
