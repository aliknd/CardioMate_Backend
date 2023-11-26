import express from "express";
const router = express.Router();
import Joi from "joi";
import auth from "../middleware/auth.js";

import usersStore from "../store/users.js";
import validateWith from "../middleware/validation.js";

const schema = {
  name: Joi.string().required().min(2),
  email: Joi.string().email().required(),
  genCategory: Joi.object().required(),
  birthdate: Joi.object().required(),
  raceCategory: Joi.object().required(),
  preference: Joi.object().required(),
  //catDog: Joi.object().required(),
  password: Joi.string().required().min(5),
};

router.post("/", validateWith.validateWith(schema), async (req, res) => {
  //console.log(req.body);
  const {
    name,
    email,
    genCategory,
    birthdate,
    raceCategory,
    preference,
    //catDog,
    password,
    access_type,
  } = req.body;
  const user_received = await usersStore.getUserByEmail(email);
  console.log(user_received);
  const user_r = user_received[0];
  if (user_r)
    return res
      .status(400)
      .send({ error: "A user with the given email already exists." });

  const user = {
    name,
    email,
    genCategory,
    birthdate,
    raceCategory,
    preference,
    //catDog,
    password,
    access_type,
  };
  usersStore.addUser(user);

  res.status(201).send(user);
});

router.get("/", auth.auth, async (req, res) => {
  try {
    const users = await usersStore.getUsers();
    res.send(users);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

export default router;
