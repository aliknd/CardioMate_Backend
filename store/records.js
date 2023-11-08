import myDatabase from "../config/db.js";
// const result = await myDatabase.pool.query("SELECT * FROM record");
// var records = result[0];

// const getRecords = records;

async function getRecords() {
  const result = await myDatabase.pool.query("SELECT * FROM record");
  return result[0];
}

export default { getRecords };
