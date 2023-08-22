import express from "express";
const router = express.Router();

import listingsStore from "../store/listings.js";
import auth from "../middleware/auth.js";
import listingMapper from "../mappers/listings.js";

router.get("/listings", auth.auth, (req, res) => {
  const listings = listingsStore.filterListings(
    (listing) => listing.userId === req.user.userId
  );
  const resources = listings.map(listingMapper);
  res.send(resources);
});

export default { router };
