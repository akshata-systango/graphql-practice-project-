import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import "./chat.css";
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE } from "../Graphql/Mutations";
import { useLocation } from "react-router-dom";
import DisplayChat from "./DisplayChat";

export default function Chat({ route }) {
  const params = useLocation();
  const uniqueId = () => {
    return String(Math.floor(Math.random() * (1000 - 1 + 1)) + 1)
  }
  const user = params.state.username;
  const id = params.state.id;
  console.log(params, 'param');
  const [chatDetail, setChatDetail] = useState({
    message: "",
    username: "",
    number: "",
  });

  const [sendMessage, { errors, data }] = useMutation(SEND_MESSAGE);
  const messageTypingHandler = (event) => {
    const values = event.target.value;
    const names = event.target.name;
    setChatDetail((value) => ({ ...value, [names]: values }));
    // setMessage([{ ...chat.message, message: value }]);
  };
  console.log(data, 'userdaayyyyyaaa');
  const sendMessageHandler = (event) => {
    event.preventDefault();
    sendMessage({
      variables: {
        id: uniqueId(),
        userId:id,
        username: user,
        message: chatDetail.message,
      },
    });
    setChatDetail({
      message: "",
      username: "",
    });
  };
  const result = user === chatDetail?.username ? "outgoing" : "incoming";
  console.log(result, "result");
  return (
    <Box
      sx={{
        width: 500,
        height: 450,
        marginLeft: 50,
        border: "1px solid #1976d2",
      }}
    >
      <div className="display-message">
        <DisplayChat MessageType={result} />
        {/* {messageSended && <div>{MessageMapping}</div>} */}
      </div>
      <div className="chat">
        {" "}
        <TextField
          fullWidth
          className="text-field"
          label="Username..."
          id="fullWidth"
          name="username"
          value={user}
          onChange={messageTypingHandler}
        />
        <TextField
          fullWidth
          className="text-field"
          label="type here..."
          id="fullWidth"
          name="message"
          value={chatDetail?.message ? chatDetail.message : ''}
          onChange={messageTypingHandler}
        />
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          type="submit"
          onClick={sendMessageHandler}
        ></Button>
      </div>
    </Box>
  );
}
