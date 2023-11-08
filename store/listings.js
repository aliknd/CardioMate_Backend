import myDatabase from "../config/db.js";

const addListing = (listing) => {
  myDatabase.pool.query(
    "INSERT INTO record (substance_fruit_label, crave_use_none_label, crave_use_none_value, user_id) VALUES ?",
    [listing],
    function (err, result) {
      if (err) throw err;
      console.log("Inserted Successfully!" + result.affectedRows);
    }
  );

  // myDatabase.pool.query(
  //   "UPDATE user SET badge = ? WHERE id = ?",
  //   [userBadge, myUserId],
  //   function (err, result) {
  //     if (err) throw err;
  //     console.log("Updated Successfully!" + result.affectedRows);
  //   }
  // );
};

const getListings = async () => {
  const [listings] = await myDatabase.pool.query("SELECT * FROM feeder");
  return listings;
};

const getListingById = async (id) => {
  const [listing] = await myDatabase.pool.query(
    "SELECT * FROM feeder WHERE id = ?",
    [id]
  );
  return listing[0];
};

const filterListings = (predicate) => listings.filter(predicate);

export default { getListings, addListing, getListingById };
