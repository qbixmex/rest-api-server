const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT;

app.get("/", (request, response) => {
  response.send("Express Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
});
