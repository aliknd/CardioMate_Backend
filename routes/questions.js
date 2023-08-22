import express from "express";
const router = express.Router();

import questionStore from "../store/questions.js";

router.get("/", (req, res) => {
  const questions = questionStore.getQuestions;
  res.send(questions);
});

export default { router };
