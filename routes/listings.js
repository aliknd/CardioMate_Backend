import express from "express";
const router = express.Router();
import Joi from "joi";
import multer from "multer";

import store from "../store/listings.js";
import validateWith from "../middleware/validation.js";
import auth from "../middleware/auth.js";
import imageResize from "../middleware/imageResize.js";
import listingMapper from "../mappers/listings.js";
//import config from "config";

const upload = multer({
  dest: "uploads/",
  limits: { fieldSize: 25 * 1024 * 1024 },
});

const schema = {
  categoryId: Joi.number().required().min(1),
};

// const validateCategoryId = (req, res, next) => {
//   if (!categoriesStore.getCategory(parseInt(req.body.categoryId)))
//     return res.status(400).send({ error: "Invalid categoryId." });

//   next();
// };

router.get("/", (req, res) => {
  const listings = store.getListings;
  const resources = listings.map(listingMapper.mapper);
  res.send(resources);
});

router.post(
  "/",
  [
    upload.none(),
    //upload.array("images", config.get("maxImageCount")),
    validateWith.validateWith(schema),
    //imageResize.imageResize,
  ],

  async (req, res) => {
    console.log(req.body);
    const listing = {
      categoryLabel: req.body.categoryLabel,
      categoryId: parseInt(req.body.categoryId),
      questionId: parseInt(req.body.questionId),
      cuserId: parseInt(req.body.cuserId),
    };
    console.log(listing);
    //listing.images = req.images.map((fileName) => ({ fileName: fileName }));
    if (req.user) listing.userId = req.user.userId;

    store.addListing(listing);

    res.status(201).send(listing);
  }
);

export default { router };
