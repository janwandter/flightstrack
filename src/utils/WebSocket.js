
export const sendConectionMessage = (client) => {
  const data = {
    type: "join",
    id: process.env.REACT_APP_WEBSOCKET_USER_ID,
    username: process.env.REACT_APP_WEBSOCKET_USERNAME
  }
  client.send(JSON.stringify({
    ...data
  }));
}

export const sendChatMessage = (client, msg) => {
  client.send(JSON.stringify({
    type: "chat",
    content: msg
  }));
}
