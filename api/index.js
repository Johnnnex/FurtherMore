const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const bot = require("./bot");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/users", (req, res) => {
  const user = User.create(req.body);
  res.send(user);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// app.get("/sendmessage/:chatId/:message", (req, res) => {
//   const { chatId, message } = req.params;

//   bot
//     .sendMessage(chatId, message)
//     .then(() => res.send("Message sent!"))
//     .catch((error) =>
//       res.status(500).send("Error sending message: " + error.message)
//     );
// });
