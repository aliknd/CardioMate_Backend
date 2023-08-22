import express from "express";
const router = express.Router();

import store from "../store/listings.js";
import auth from "../middleware/auth.js";
import listingMapper from "../mappers/listings.js";

router.get("/:id", auth.auth, (req, res) => {
  const listing = store.getListing(parseInt(req.params.id));
  if (!listing) return res.status(404).send();
  const resource = listingMapper(listing);
  res.send(resource);
});

export default { router };
