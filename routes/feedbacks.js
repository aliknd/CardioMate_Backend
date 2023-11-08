import express from "express";
const router = express.Router();
import Joi from "joi";
import multer from "multer";

import store from "../store/feedbacks.js";
import validateWith from "../middleware/validation.js";

const upload = multer({
  dest: "uploads/",
  limits: { fieldSize: 25 * 1024 * 1024 },
});

const schema = {
  categoryId: Joi.number().required().min(1),
};

router.post(
  "/",
  [
    upload.none(),
    //upload.array("images", config.get("maxImageCount")),
    validateWith.validateWith(schema),
    //imageResize.imageResize,
  ],

  async (req, res) => {
    //console.log(req.body);
    const feedback = {
      categoryLabel: req.body.categoryLabel,
      categoryId: parseInt(req.body.categoryId),
      cuserId: parseInt(req.body.cuserId),
      description: req.body.description,
    };
    //console.log(listing);
    //listing.images = req.images.map((fileName) => ({ fileName: fileName }));
    if (req.user) feedback.userId = req.user.userId;

    store.addFeedback(feedback);

    res.status(201).send(feedback);
  }
);

export default { router };
