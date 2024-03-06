const events = require("events");
const net = require("net");
const channel = new events.EventEmitter();
const PORT = 8888;

channel.clients = {};
channel.subscriptions = {};
channel.on("join", function(id, client) {
  console.log("===============", {
    client
  });
  this.client[id] = client;
  this.subscriptions[id] = (senderId, message) => {
    if (id !== senderId) {
      this.clients[id].write(message);
    }
  };
  this.on("broadcast", this.subscriptions[id]);
});

channel.on("leave", function(id) {
  channel.removeAllListeners("broadcast", this.subscriptions[id]);
  channel.emit("broadcast", id, `${id} has left the chatroom. \n`);
});

channel.on("shutdown", () => {
  channel.emit("broadcast", "", `The server has shutdown. \n`);
  channel.removeAllListeners("broadcast");
});

const server = net.createServer(client => {
  const id = `${client.remoteAddress}:${client.remotePort}`;
  channel.emit("join", id, client);
  client.on("data", data => {
    data = data.toString();
    channel.emit("broadcast", id, data);
  });
  client.on("close", () => {
    channel.emit("leave", id);
  });
});

server.listen(PORT, () => {
  console.log(`Start server channel http://localhost:${PORT}`);
});
