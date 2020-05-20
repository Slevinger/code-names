import React, { useState } from "react";
import Dialog from "../Dialog";
import { Button } from "../common/StyledComponents";

export default ({
  joinGame,
  createGame,
  state: { gameId, nickname: name }
}) => {
  const [nickname, setNickname] = useState(name);

  return (
    <Dialog>
      <div>
        <div className="label">Nick Name</div>
        <input
          type="text"
          placeholder="Select Nickname"
          value={nickname}
          onChange={e => {
            setNickname(e.target.value);
          }}
        />
        <div className="select-method-buttons">
          <Button
            onClick={() => {
              nickname && createGame(nickname);
            }}
          >
            CREATE
          </Button>
          <Button
            onClick={() => {
              nickname && joinGame(gameId, nickname);
            }}
          >
            JOIN
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
