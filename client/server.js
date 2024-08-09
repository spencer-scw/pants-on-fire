//const { createServer } = require("node:http");
//const { next } = require ("next");
//const { Server } = require("socket.io");

import { createServer } from "node:http";
import https from 'node:https';
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log('a user connected');
    getArticles(1, (pages) => {
      io.emit("pages", pages);
    })
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});

function getArticles(amount, action) {
  https.get(
    'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info|extracts&iwurl=1&continue=grncontinue||&generator=random&formatversion=2&inprop=url&exchars=200&exintro=1&explaintext=1&grnnamespace=0&grnlimit=' + amount,
    (res) => {
      const { statusCode } = res;
      const contentType = res.headers['content-type'];

      let error;
      if (statusCode !== 200) {
        error = new Error(`Request Failed.\nStatus Code: ${statusCode}`);
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error(`Invalid content-type.\nExpected application/json but recieved ${content-type}`)
      }
      if (error) {
        console.error(error.message);
        res.resume();
        return;
      }

      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk) => { rawData += chunk; });
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
          action(parsedData.query.pages);
        } catch (e) {
          console.error(e.message);
        }
      });
    }).on('error', (e) => {
      console.error(`Got error: ${e.message}`);
    });
}

getArticles(5, (pages) => {
  console.log(pages[0]);
});
