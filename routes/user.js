import express from "express";
import { User } from "../models/users.js";

const router = express.Router();
router
  .route("/")
  // add users
  .post(async (request, respone) => {
    const addUser = request.body;
    console.log(addUser);
    // USERS.push(addUser);
    // console.log(addUser);
    // Users.insertMany;
    const user = new User({
      createdAt: addUser.createdAt,
      name: addUser.name,
      avatar: addUser.avatar,
      password: addUser.password,
      id: addUser.id,
      userid: addUser.id,
    });
    // or this can be used
    // const user = new Users(addUser);
    try {
      const newUser = await user.save();
      console.log(newUser);
      respone.send(newUser);
    } catch (err) {
      respond.staus(500);
      respone.send(err);
    }
  })
  //to get all the users
  .get(async (request, respone) => {
    const Users = await User.find().sort({ userid: 1 });
    // console.log(Users);
    respone.send(Users);
  });

router
  .route("/:id")
  // find users by id
  .get(async (request, respone) => {
    const { id } = request.params;
    console.log("its working good");
    console.log(id);

    // const user = USERS.find((data) => data.id === id);
    const user = await User.findOne({ id: id });
    respone.send(user);
  });

// delete particular user by id
delete (async (request, respone) => {
  const { id } = request.params;
  // const user = USERS.find((data) => data.id === id);
  const user = await User.findById(id);
  await user.remove();
  try {
    respone.send({ ...user, message: "deleted the user" });
  } catch (err) {
    respond.staus(500);
    respone.send("user is missing");
  }
});

export const userRouter = router;
