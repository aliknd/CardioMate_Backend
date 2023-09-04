import myDatabase from "../config/db.js";
const result = await myDatabase.pool.query("SELECT * FROM feeder");
var listings = result[0];

const addListing = (listing) => {
  const mySubstanceFruitValue = listing.substanceValue;
  const mySubstanceFruitLabel = listing.substanceLabel;
  const mycuseValue = listing.cuseValue;
  const mycuseLabel = listing.cuseLabel;
  const mycraveUseClass = listing.categoryLabel;
  //console.log(mycraveUseClass);
  const mycraveUseId = listing.categoryId;
  const myQuestionId = listing.questionId;
  const myUserId = listing.cuserId;
  const userBadge = listing.userBadge;
  // console.log(mycraveUse);
  // console.log(myUserId);
  myDatabase.pool.query(
    "INSERT INTO record (substance_fruit, substance_fruit_id, crave_use, crave_use_id, question_id, final_answer, final_answer_id, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      mySubstanceFruitLabel,
      mySubstanceFruitValue,
      mycuseLabel,
      mycuseValue,
      myQuestionId,
      mycraveUseClass,
      mycraveUseId,
      myUserId,
    ],
    function (err, result) {
      if (err) throw err;
      console.log("Inserted Successfully!" + result.affectedRows);
    }
  );

  myDatabase.pool.query(
    "UPDATE user SET badge = ? WHERE id = ?",
    [userBadge, myUserId],
    function (err, result) {
      if (err) throw err;
      console.log("Updated Successfully!" + result.affectedRows);
    }
  );
};

const getListings = listings;

const getListing = (id) => listings.find((listing) => listing.id === id);

const filterListings = (predicate) => listings.filter(predicate);

export default { getListings, addListing };
