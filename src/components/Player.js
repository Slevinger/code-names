import React from "react";
import DoneIcon from "@material-ui/icons/Done";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
/*
props = > {
 "nickname": "slevinger",
 "isReady": false,
 "selectedCell": false,
 "isHinter": true,
 "teamColor": "blue"
}
*/

export default ({
  board,
  nickname,
  isReady,
  selectedCell,
  teamColor,
  ...props
}) => {
  return (
    <div className="player">
      <FiberManualRecordIcon style={{ color: teamColor }} />
      <div className="player-name">{nickname}</div>
      <div className="player-name">{`${
        board[selectedCell] ? `[${board[selectedCell].word}]` : ""
      }`}</div>
      {isReady && <DoneIcon style={{ color: "green" }} />}
    </div>
  );
};
