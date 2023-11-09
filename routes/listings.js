import express from "express";
const router = express.Router();
import Joi from "joi";
import multer from "multer";

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
    //console.log(req.body);
    const listing = {
      payload: req.body.payload,
      userId: parseInt(req.body.userId),
    };
    //console.log(listing);
    console.log("Raw payload:", listing.payload);
    let parsedPayload = JSON.parse(listing.payload);

    let recordsToInsert = Object.values(parsedPayload)
      .map((item) => {
        if (!item.step1Value || !item.step2Value) {
          console.error("item structure:", item);
          return null; // or handle this case as needed
        }

        // Use the description if the label is 'Others', otherwise use the label
        let labelOrDescription =
          item.label === "Others" ? item.description : item.label;

        // Check if step2Value is an object with a label, or just a string (date)
        let step2Value;
        if (
          typeof item.step2Value === "object" &&
          item.step2Value !== null &&
          "label" in item.step2Value
        ) {
          step2Value = item.step2Value.label;
        } else if (typeof item.step2Value === "string") {
          step2Value = item.step2Value;
        } else {
          console.error("Invalid step2Value structure:", item.step2Value);
          return null;
        }

        return [
          labelOrDescription,
          item.step1Value.label,
          step2Value,
          listing.userId,
        ];
      })
      .filter((item) => item !== null); // Filter out any nulls from invalid structures
    //listing.images = req.images.map((fileName) => ({ fileName: fileName }));
    if (req.user) listing.userId = req.user.userId;

    store.addListing(recordsToInsert);

    res.status(201).send(listing);
  }
);

export default router;
