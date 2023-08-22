import myDatabase from "../config/db.js";
const result = await myDatabase.pool.query("SELECT * FROM feeder");
var listings = result[0];

const addListing = (listing) => {
  const mycraveUseClass = listing.categoryLabel;
  console.log(mycraveUseClass);
  const mycraveUseId = listing.categoryId;
  const myQuestionId = listing.questionId;
  const myUserId = listing.cuserId;
  // console.log(mycraveUse);
  // console.log(myUserId);
  myDatabase.pool.query(
    "INSERT INTO record (question_id, crave_use_class, crave_use_id, user_id) VALUES (?, ?, ?, ?)",
    [myQuestionId, mycraveUseClass, mycraveUseId, myUserId],
    function (err, result) {
      if (err) throw err;
      console.log("Inserted Successfully!" + result.affectedRows);
    }
  );
};

const getListings = listings;

const getListing = (id) => listings.find((listing) => listing.id === id);

const filterListings = (predicate) => listings.filter(predicate);

export default { getListings, addListing };
