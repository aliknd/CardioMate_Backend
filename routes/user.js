import express from "express";
const router = express.Router();

import usersStore from "../store/users.js";
import listingsStore from "../store/listings.js";
import auth from "../middleware/auth.js";

router.get("/:id", auth.auth, (req, res) => {
  const userId = parseInt(req.params.id);
  const user = usersStore.getUserById(userId);
  if (!user) return res.status(404).send();

  const listings = listingsStore.filterListings(
    (listing) => listing.userId === userId
  );

  res.send({
    id: user.id,
    name: user.name,
    email: user.email,
    listings: listings.length,
  });
});

export default { router };
