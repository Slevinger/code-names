import { useState, useReducer, useEffect } from "react";
import axios from "../apis/codeNameApi";
import openSocket from "socket.io-client";
import { PROD_PATH, DEV_PATH } from "../const/config";

import { createBrowserHistory } from "history";
const history = createBrowserHistory();

const initialState = {
  cellsMap: {}
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "selectCard":
      const { cellIndexes } = payload;
      return {
        ...state,
        [cellIndexes]: { ...state[cellIndexes], marked: true }
      };
    case "gameUpdate":
      const { nickname = "", game: updatedGame } = payload;
      const player = updatedGame.players[nickname];
      return {
        ...state,
        ...updatedGame,
        player
      };
    case "setGame":
      const { game } = payload || { game: initialState };
      return { ...state, ...game };
    case "createGame":
      const { newGameId } = payload;
      return { ...initialState, gameId: newGameId };
    default:
      return state;
  }
};
const socket = openSocket(PROD_PATH);
socket.connect();

const singupForGameChange = (dispatch, nickname) => {
  socket.on("gameChange", game => {
    console.log("game", game);
    history.push(`/code-names/games/${game.gameId}`);
    debugger;
    dispatch({ type: "gameUpdate", payload: { game, nickname } });
  });
};

const handleError = error => console.log(error);

export default () => {
  const splitPath = history.location.pathname.split("/");
  const urlId = splitPath[splitPath.length - 1];

  const [state, dispatch] = useReducer(reducer, { ...initialState });
  const [nickname, setNickname] = useState(null);

  useEffect(() => {
    if (nickname) {
      singupForGameChange(dispatch, nickname);
    }
    (async (urlId, gameId) => {
      if (urlId != "games" && gameId !== urlId) {
        getGame(urlId);
      }
    })(urlId, state.gameId);
  }, [urlId, state.gameId, nickname]);

  const createGame = async nickname => {
    setNickname(nickname);
    socket.emit("createGame", { nickname }, handleError);
  };

  const startGame = () => {
    socket.emit("startGame", { gameId: state.gameId }, handleError);
  };

  const getGame = async gameId => {
    const { data: game } = await axios.get(`/games/${gameId}`);
    dispatch({ type: "setGame", payload: { game } });
  };

  const setQlue = (qlue, numberOfWords) => {
    const { gameId } = state;
    debugger;
    socket.emit("setQlue", { qlue, numberOfWords, gameId });
  };

  const togglePlayerReady = nickname => {
    const { gameId } = state;
    socket.emit("togglePlayerReady", { gameId, nickname });
  };

  const chooseTeam = async (teamColor, role = "guesser") => {
    const { gameId } = state;
    socket.emit("chooseTeam", { gameId, nickname, teamColor, role });
  };

  const leaveGame = () => {
    setNickname("");
    socket.disconnect();
    // localStorage.removeItem(`nickname-${gameId}`);

    // socket.emit("leaveGame", { nickname: state.nickname, gameId });
    // axios.post(`/games/leave/${gameId}/${state.nickname}`);
  };

  const joinGame = async (gameId, nickname) => {
    await setNickname(nickname);
    socket.emit("joinGame", { nickname, gameId }, handleError);
  };

  const cellSelected = async cellIndexes => {
    socket.emit("cellSelected", {
      gameId: state.gameId,
      nickname,
      cellIndexes
    });
    // dispatch({ action: "cellSelected", payload: { cellIndexes } });
  };

  const actions = {
    setQlue,
    getGame,
    joinGame,
    chooseTeam,
    leaveGame,
    createGame,
    startGame,
    cellSelected,
    togglePlayerReady
  };

  return {
    state: { ...state, nickname },
    history,
    ...actions
  };
};
