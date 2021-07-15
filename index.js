import express from "express";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
const app = express();

const PORT = process.env.PORT || 5000;
// const url = process.env.MONGODB_URI || "mongodb://localhost/RecipeData";

// Opened Connection to loacal DB, movieData - db name
// const url = "mongodb://localhost/MovieData";

// Opened Connection to mongo atlas DB, movieData - db name
const url = "mongodb+srv://ikram:ikram98@cluster0.rlfdm.mongodb.net/BookMyShow";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const con = mongoose.connection;
con.on("open", () => console.log("MongoDB is connected "));

// middleware
app.use(express.json());

app.get("/", (request, respone) => {
  respone.send(" hello hi");
});

app.use("/users", userRouter);

app.listen(PORT, () => console.log("server is started"));
