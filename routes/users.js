import express from "express";
const router = express.Router();
import Joi from "joi";

import usersStore from "../store/users.js";
import validateWith from "../middleware/validation.js";

const schema = {
  name: Joi.string().required().min(2),
  email: Joi.string().email().required(),
  genCategory: Joi.object().required(),
  ageCategory: Joi.object().required(),
  raceCategory: Joi.object().required(),
  preference: Joi.object().required(),
  //catDog: Joi.object().required(),
  password: Joi.string().required().min(5),
};

router.post("/", validateWith.validateWith(schema), async (req, res) => {
  console.log(req.body);
  const {
    name,
    email,
    genCategory,
    ageCategory,
    raceCategory,
    preference,
    //catDog,
    password,
  } = req.body;
  const user_received = await usersStore.getUserByEmail(email);
  const user_r = user_received[0][0];
  if (user_r)
    return res
      .status(400)
      .send({ error: "A user with the given email already exists." });

  const user = {
    name,
    email,
    genCategory,
    ageCategory,
    raceCategory,
    preference,
    //catDog,
    password,
  };
  usersStore.addUser(user);

  res.status(201).send(user);
});

router.get("/", (req, res) => {
  res.send(usersStore.getUsers);
});

export default { router };
