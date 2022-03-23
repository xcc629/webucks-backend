const http = require("http");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const routes = require("./routes");

const prisma = new PrismaClient();

const app = express();

app.use(express.json());
app.use(routes);

app.use((err, req, res, next) => {
  const { status, message } = err;
  console.error(err);
  res.status(status || 500).json({ message });
});

app.get("/", (req, res) => {
  res.json({ message: "/ enpoint" });
});

const server = http.createServer(app);

const start = async () => {
  try {
    server.listen(8000, () =>
      console.log("Hi! server is listening on PORT 8000")
    );
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
  }
};

start();
