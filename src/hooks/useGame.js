import { useState, useReducer, useEffect } from "react";
import axios from "../apis/codeNameApi";
import { socket } from "../services/socket";
import { parseQueryString } from "../const/utils";
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
const notifyMe = message => {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification(message);
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function(permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification(message);
      }
    });
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.
};

const singupForGameChange = (dispatch, state, nickname) => {
  socket.on("gameChange", game => {
    debugger;
    console.log("game", game);
    history.push(`/code-names${game.gameId ? `?gameId=${game.gameId}` : ""}`);

    // const message =
    //   state.whosTurn !== game.whosTurn &&
    //   game.whosTurn === game.players[nickname].teamColor
    //     ? `Code Names :: It is your Team's turn`
    //     : null;
    // message && notifyMe(message);
    dispatch({ type: "gameUpdate", payload: { game, nickname } });
  });
};

const handleError = error => console.log(error);

export default () => {
  const { gameId: gameUrlId } = parseQueryString(history.location.search);
  // const urlId = splitPath[splitPath.length - 1];
  const [state, dispatch] = useReducer(reducer, { ...initialState });
  const [nickname, setNickname] = useState(
    window.localStorage.getItem(gameUrlId)
  );

  useEffect(() => {
    if (nickname && !state.nickname) {
      singupForGameChange(dispatch, state, nickname);
      window.localStorage.setItem(gameUrlId, nickname);
      (async (urlId, gameId) => {
        if (urlId != "games" && gameId !== urlId) {
          joinGame(urlId, nickname);
        }
      })(gameUrlId, state.gameId);
    }
  }, [gameUrlId, state.gameId, nickname]);

  const createGame = async (nickname, gameId) => {
    setNickname(nickname);
    socket.emit("createGame", { nickname, gameId }, handleError);
  };

  const restartBoard = () => {
    const { gameId } = state;
    socket.emit("newBoard", { gameId });
  };

  const startGame = () => {
    socket.emit("startGame", { gameId: state.gameId }, handleError);
  };

  const getGame = async gameId => {
    const { data: game } = await axios.get(`/games/${gameId}`);
    dispatch({ type: "setGame", payload: { game } });
  };

  const setClue = (clue, numberOfWords) => {
    const { gameId } = state;
    debugger;

    socket.emit("setClue", { clue, numberOfWords, gameId });
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
    restartBoard,
    setClue,
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
