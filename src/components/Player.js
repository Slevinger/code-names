import React from "react";
import DoneIcon from "@material-ui/icons/Done";

/*
props = > {
 "nickname": "slevinger",
 "isReady": false,
 "selectedCell": false,
 "isHinter": true,
 "teamColor": "blue"
}
*/

export default ({ board, nickname, isReady, selectedCell, ...props }) => {
  debugger;
  return (
    <div className="player">
      <div className="player-name">{nickname}</div>
      <div className="player-name">{`${
        board[selectedCell] ? `[${board[selectedCell].word}]` : ""
      }`}</div>
      {isReady && <DoneIcon style={{ color: "green" }} />}
    </div>
  );
};
