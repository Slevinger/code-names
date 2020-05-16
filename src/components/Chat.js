import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
  useReducer
} from "react";
import { socket } from "../services/socket";
import styled from "styled-components";

const Chat = styled.div`
  width: 80%;
  max-height: 300px;
  height: 300px;
  overflow-y: hidden;
  margin: 10px;
  border-style: inset;
  display: flex;
  position: relative;
  flex-direction: column;

  .messages {
    flex: 1;
    overflow-y: scroll;
  }
  input {
    flex: 1;
    padding: 5px;
  }
  form {
    width: 100%;

    flex-direction: row;
    position: relative;
    display: flex;
    font-size: 15px;
  }
  .send-btn {
    color: white;
    background-color: blue;
    padding: 5px;
  }
`;

const Message = styled.div`
  padding: 5px;
`;

const messages = [];

const messagesReducer = (state, { type, payload }) => {
  switch (type) {
    case "add_message":
      const { nickname, message } = payload;
      return [...state, { nickname, message }];
    default:
      return state;
  }
};

export default ({ nickname, gameId }) => {
  const [messages, dispatch] = useReducer(messagesReducer, []);
  const [message, setMessage] = useState("");
  const [subscribedForMessages, setSubscribedForMessages] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!subscribedForMessages) {
      socket.on("message", ({ nickname, message }) => {
        debugger;
        dispatch({ type: "add_message", payload: { nickname, message } });
        // setMessages([...messages]);
      });
      setSubscribedForMessages(true);
    }
  }, [dispatch, messages]);

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = useCallback(
    e => {
      socket.emit("sendMessage", { nickname, message, gameId }, error => {
        if (error) {
          console.log(error);
        } else {
          console.log("messege sent");
        }
      });
      setMessage("");
      e.preventDefault();
    },
    [message, nickname, gameId]
  );

  return (
    <Chat>
      <div className="messages">
        {messages.map(({ nickname, message }) => (
          <Message
            key={nickname + message}
          >{`${nickname} : ${message}`}</Message>
        ))}
        <div ref={bottomRef} />
      </div>
      <div>
        <form className="messages-text">
          <input
            value={message}
            type="text"
            onChange={e => {
              e.target.focus();
              setMessage(e.target.value);
            }}
          />
          <button onClick={sendMessage} class="send-btn">
            SEND
          </button>
        </form>
      </div>
    </Chat>
  );
};
