import express from "express";
import cors from "cors";

const server = express();
server.use(cors());
server.use(express.json());

const users = [];
const tweets = [];

server.post("/sign-up", (request, response) => {
  users.push({
    username: request.body.username,
    avatar: request.body.avatar,
  });
  response.send("OK");
});
server.post("/tweets", (request, response) => {
  tweets.push({
    username: request.body.username,
    tweet: request.body.tweet,
  });
  response.send("OK");
});
server.get("/tweets", (request, response) => {
  let dados = [];
  let qtdTweets;

  tweets.reverse();

  if (tweets.length < 10) {
    qtdTweets = tweets.length;
  } else {
    qtdTweets = 10;
  }

  for (let i = 0; i < qtdTweets; i++) {
    let user = tweets[i].username;
    let tweet = tweets[i].tweet;
    let avatar = "";

    for (let j = 0; j < users.length; j++) {
      if (tweets[i].username === users[j].username) {
        avatar = users[j].avatar;
        break;
      }
    }
    dados.push({
      username: user,
      avatar: avatar,
      tweet: tweet,
    });
  }
  response.send(dados);
});

server.listen(5000);
