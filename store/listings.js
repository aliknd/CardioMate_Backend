import myDatabase from "../config/db.js";

const addListing = (listings) => {
  myDatabase.pool.query(
    "INSERT INTO questionnaire_responses (user_id, interaction_answer, interaction_detail, physicalDiscomfort_answer, physicalDiscomfort_detail, environment_answer, environment_detail, medication_answer, medication_detail, medication_date_time, local_medication_date_time, mood_value, stressLevel_value, local_created_at) VALUES ?",
    [listings],
    function (err, result) {
      if (err) {
        console.error("Error inserting data:", err);
        return;
      }
      console.log(
        "Inserted Successfully! Affected Rows:" + result.affectedRows
      );
    }
  );
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
