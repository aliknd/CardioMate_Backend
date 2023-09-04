import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: "localhost",
    user: "banaware_user",
    password: "BanAware2023#",
    database: "banaware-uh",
  })
  .promise();

export default { pool };
