const express = require("express");
const cors = require("cors");
const config = require("./config/config"); // Import the configuration

const server = express();

server.use(cors());
server.options("*", cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use("/api/v1/admin", require("./routers/admin"));
server.use("/api/v1/", require("./routers/user"));

// Healthcheck endpoint
server.get("/health", (req, res) => {
  res.sendStatus(200);
});

const envConfig = config[process.env.NODE_ENV || "development"];

server.listen(envConfig?.api_port, () =>
  console.log(`Server started on port ${envConfig?.api_port}`)
);
