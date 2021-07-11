const express = require("express");
const app = express();

const PORT = 5000;

const USERS = [
  {
    createdAt: "2021-07-05T08:28:06.683Z",
    name: "ikram",
    password: "password 1",
    id: "1",
  },

  {
    createdAt: "2021-07-05T08:28:06.683Z",
    name: "ikram 2",
    password: "password 2",
    id: "2",
  },
];

// Opened Connection to DB, movieData - db name
const url = "mongodb://localhost/MovieData";

mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connec6tion;
con.on("open", () => console.log("MongoDB is connected"));

// middleware
app.use(express.json());

app.get("/", function (request, respone) {
  respone.send(" hello hi");
});

app.get("/users", function (request, respone) {
  respone.send(USERS);
});

app.get("/users/:id", function (request, respone) {
  const { id } = request.params;
  const user = USERS.find((data) => data.id === id);
  respone.send(user);
});

// add users
app.post("/users", function (request, respone) {
  const addUser = request.body;
  console.log(addUser);
  USERS.push(addUser);
  console.log(addUser);
  respone.send(USERS);
});

app.listen(PORT, () => console.log("server is started"));
