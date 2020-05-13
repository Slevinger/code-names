import React, { useState } from "react";
import Dialog from "../Dialog";

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
          <button
            onClick={() => {
              nickname && createGame(nickname);
            }}
          >
            CREATE
          </button>
          <button
            onClick={() => {
              nickname && joinGame(gameId, nickname);
            }}
          >
            JOIN
          </button>
        </div>
      </div>
    </Dialog>
  );
};
