import Websocket, { WebSocketServer } from 'ws'
const wss  = new WebSocketServer({port: 3000});
console.log("server started")

wss.on('connection', (ws) => {
  send(ws, {
    "message": "welcome"
  })
});

function send(ws, json) {
  ws.send(JSON.stringify(json));
};

function broadcast(ws, json) {
  wss.clients.forEach(function each(client) {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      send(client, json);
    }
  });
}
