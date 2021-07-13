import express from "express";
import mongoose from "mongoose";
import { User } from "./models/users.js";
const app = express();

const PORT = 5000;

// const USERS = [
//   {
//     createdAt: "2021-07-05T08:28:06.683Z",
//     name: "ikram",
//     password: "password 1",
//     id: "1",
//   },

//   {
//     createdAt: "2021-07-05T08:28:06.683Z",
//     name: "ikram 2",
//     password: "password 2",
//     id: "2",
//   },
// ];

// Opened Connection to DB, movieData - db name
const url = "mongodb://localhost/MovieData";

mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;
con.on("open", () => console.log("MongoDB is connected"));

// middleware
app.use(express.json());

app.get("/", (request, respone) => {
  respone.send(" hello hi");
});

app.get("/users", async (request, respone) => {
  const Users = await User.find().sort({ userid: 1 });
  // console.log(Users);
  respone.send(Users);
});

app.get("/users/:id", async (request, respone) => {
  const { id } = request.params;
  // const user = USERS.find((data) => data.id === id);
  const user = await Users.find({ id: id });
  respone.send(user);
});

// add users
app.post("/users", async (request, respone) => {
  const addUser = request.body;
  console.log(addUser);
  // USERS.push(addUser);
  // console.log(addUser);
  // Users.insertMany;
  const user = new Users({
    createdAt: addUser.createdAt,
    name: addUser.name,
    avatar: addUser.avatar,
    userid: addUser.userid,
    password: addUser.password,
    id: addUser.id,
  });
  // or this can be used
  // const user = new Users(addUser);
  try {
    const newUser = await user.save();
    respone.send(newUser);
  } catch (err) {
    respond.staus(500);
    respone.send(err);
  }
});

app.delete("/users/:id", async (request, respone) => {
  const { id } = request.params;
  // const user = USERS.find((data) => data.id === id);
  const user = await Users.findById(id);
  await user.remove();
  try {
    respone.send({ message: "deleted the user" });
  } catch (err) {
    respond.staus(500);
    respone.send("user is missing");
  }
});

app.listen(PORT, () => console.log("server is started"));
