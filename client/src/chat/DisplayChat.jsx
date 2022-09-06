import { useQuery, readQuery } from "@apollo/client";
import { Box, Chip } from "@mui/material";
import React, {useEffect, useState} from "react";
import { GET_MESSAGES, MESSAGE_SUBSCRIPTION } from "../Graphql/Queries";
import "./chat.css";

const DisplayChat = ({ MessageType }) => {
  const { data, loading, errors, subscribeToMore } = useQuery(GET_MESSAGES);
  const [message, setMessage] = useState([])
//   const { message } = client.readQuery({
//   query: GET_MESSAGES,
//   variables:{
//     id: 46,
//   },
// });

  useEffect(() => {
    setMessage(data?.messages)
    console.log(data, "datassssssssssss", MessageType);
  }, [data])

  useEffect(() => {
    subscribeToMore({document:MESSAGE_SUBSCRIPTION, updateQuery:(prev, {subscriptionData}) => {
      if(!subscriptionData){ return prev}
      const newMessage = subscriptionData.data.newMessage;
      const updatedMessageList = Object.assign({}, prev, {messages:[...prev.messages, newMessage]})
      return updatedMessageList;
    }})
  }, [])
  return (
    <Box sx={{ border: "1px solid green", height: "350px" }}>
      <div className="display-chat">
        {message?.length &&
          message?.map((chats, index) => (
            <div>
              {MessageType === "incoming" && (
                <Chip
                  label={chats.message}
                  color="primary"
                  key={index}
                  // className={"chip-class"}
                />
              )}
              {MessageType === "outgoing" && (
                <Chip
                  label={chats.message}
                  color="success"
                  key={index}
                  // className={"chip-class"}
                />
              )}
            </div>
          ))}
      </div>
    </Box>
  );
};

export default DisplayChat;
