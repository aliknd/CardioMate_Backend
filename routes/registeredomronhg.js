import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import registeredOmronhgStore from "../store/registeredomronhg.js";

// Modify the route handler to be async
router.get("/", auth.auth, async (req, res) => {
  try {
    const registeredOmronhg =
      await registeredOmronhgStore.getRegisteredOmronhg();
    // Map the results to an array of user_ids
    const userIds = registeredOmronhg.map((item) => item.user_id);
    // Send the response in the desired format
    res.send({ user_ids: userIds });
  } catch (error) {
    res
      .status(500)
      .send(
        "Server error occurred while fetching registered Omron HeartGuide users."
      );
  }
});

export default router;
