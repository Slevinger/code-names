import React, { useState, useCallback } from "react";
import { action } from "@storybook/addon-actions";
import Card from "../components/Card";
import OptionsBox from "../components/common/OptionsBox";
import { Button } from "../components/common/StyledComponents";
export default {
  title: "Card",
  component: Card
};
/*
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
*/

const initalState = {
  showColor: false,
  color: "red",
  teamColor: "red",
  flipTeam: null,
  clickCount: 0,
  playersCount: 3,
  word: "test"
};

export const MyCard = () => {
  const [params, setParams] = useState(initalState);
  const { teamColor, flipTeam, clickCount, playersCount } = params;

  const click = useCallback(() => {
    if (clickCount + 1 === playersCount) {
      setParams({
        ...params,
        showColor: true,
        clickCount: 3,
        flipTeam: teamColor
      });
    } else {
      setParams({
        ...params,
        clickCount: clickCount + 1
      });
    }
  }, [clickCount, playersCount]);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Card
        indexes={"0,0"}
        disabled={false}
        clickCount={clickCount}
        playersCount={3}
        onClick={click}
        {...params}
      />
      <OptionsBox>
        <Button
          onClick={() => {
            setParams(initalState);
          }}
        >
          reset
        </Button>
      </OptionsBox>
    </div>
  );
};
