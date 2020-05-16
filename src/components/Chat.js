import React, { useEffect, useState, useCallback } from "react";
import { socket } from "../services/socket";
import styled from "styled-components";

const Chat = styled.div`
  width: 80%;
  max-height: 300px;
  height: 300px;
  overflow-y: auto;
  margin: 10px;
  border-style: inset;
  display: flex;
  position: relative;
  flex-direction: column;

  .messages {
    flex: 1;
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

export default ({ nickname, gameId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socket.on("message", ({ nickname, message }) => {
      debugger;
      setMessages([...messages, { nickname, message }]);
    });
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
      </div>
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
    </Chat>
  );
};
