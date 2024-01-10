import express from "express";
const router = express.Router();
import Joi from "joi";
import multer from "multer";
import moment from "moment-timezone";

import store from "../store/listings.js";
import validateWith from "../middleware/validation.js";
import listingMapper from "../mappers/listings.js";

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

router.get("/", async (req, res) => {
  try {
    const listings = await store.getListings();
    const resources = listings.map(listingMapper.mapper);
    res.send(resources);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
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
    try {
      const { userId, responses } = JSON.parse(req.body.payload);
      let recordsToInsert = [];

      // Extract and format the data from responses
      const medicationdate = responses.medication.date
        ? moment(responses.medication.date).format("YYYY-MM-DD HH:mm:ss")
        : null;
      const medicationDate_local = responses.medication.date
        ? moment(responses.medication.date)
            .tz("Pacific/Honolulu")
            .format("YYYY-MM-DD HH:mm:ss")
        : null;
      const localCreatedAt = moment()
        .tz("Pacific/Honolulu")
        .format("YYYY-MM-DD HH:mm:ss");

      // Prepare a record for insertion
      let record = [
        userId,
        responses.interaction.answer,
        responses.interaction.detail,
        responses.physicalDiscomfort.answer,
        responses.physicalDiscomfort.detail,
        responses.environment.answer,
        responses.environment.detail,
        responses.medication.answer,
        responses.medication.detail,
        medicationdate,
        medicationDate_local,
        responses.mood.value,
        responses.stressLevel.value,
        localCreatedAt, // Add local created at time
      ];

      recordsToInsert.push(record);

      // Store the processed records in the database
      store.addListing(recordsToInsert);
      res.status(201).send({ message: "Listing added successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  }
);

export default router;
