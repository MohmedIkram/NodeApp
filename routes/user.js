import express, { response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/users.js";
import jwt from "jsonwebtoken";

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
  })
  //to get all the users using query params
  .get(async (request, respone) => {
    console.log("before", request.query);
    if (request.query.name) {
      request.query.name = new RegExp("^" + request.query.name);
    }
    console.log("after", request.query);
    const Users = await User.find(request.query);
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
  })
  // delete particular user by id
  .delete(async (request, respone) => {
    const { id } = request.params;
    // const user = USERS.find((data) => data.id === id);
    const user = await User.findById(id);
    await user.remove();
    try {
      respone.send({ ...user.toObject(), message: "deleted the user" });
    } catch (err) {
      respond.staus(500);
      respone.send("user is missing");
    }
  })
  .patch(async (request, respone) => {
    const { id } = request.params;
    const { name, password } = request.body;

    try {
      const user = await User.findById(id);
      if (name) {
        user.name = name;
      }
      if (password) {
        user.password = password;
      }
      await user.save();
      respone.send(user);
    } catch (err) {
      respone.status(500);
      respone.send(err);
    }
  });

router.route("/login").post(async (request, respone) => {
  const { name, password } = request.body;
  try {
    const user = await User.find({ name: name });
    const inDBPassword = user.password;
    const isMatch = await bcrypt.compare(password, inDBPassword);
    if (!isMatch) {
      respone.status(500);
      response.send({ message: "invalid credential" });
    } else {
      const token = jwt.sign({ id: user._id }, "secretkey");
      console.log(token);
      response.send({
        ...user.toObject(),
        token: token,
        message: "succesfull login",
      });
    }
  } catch (err) {
    respone.status(500);
    respone.send(err);
  }
});

// Creating user
router.route("/signup").post(async (request, respone) => {
  const { name, password, avatar, createdAt } = request.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    console.log(passwordHash);

    const user = new User({
      name,
      password: passwordHash,
      avatar,
      createdAt,
    });

    await user.save();
    // db to store it
    respone.send(user);
  } catch (err) {
    respone.status(500);
    respone.send(err);
  }
});

export const userRouter = router;

// async function genHach() {
//   const password = "ikram007";
//   const salt = await bcrypt.genSalt(10);
//   const passwordHash = await bcrypt.hash(password, salt);
//   console.log(salt, passwordHash);
// }
// genHach();

// const inDBPassword =
//   "$2b$10$QhtWYp421VUhByt8C2lXtunL0Iquvl9LcP9dCBW48IXR3H80YIZZS";
// async function verifyUser() {
//   const userPassword = "ikram007";
//   const isMatch = await bcrypt.compare(userPassword, inDBPassword);

//   if (!isMatch) {
//     console.log("invalid credentials");
//   } else {
//     console.log("succesful login");
//   }
// }
// verifyUser();
