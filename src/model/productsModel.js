const { dbQuery, dbExecute } = require("../utils/DB_Helper");
const table = "products";
const showLog = false;

async function getAllRecordsDB() {
  const sql = `SELECT * FROM ${table}`;
  const [dbResponse] = await dbQuery(sql, showLog);
  //   console.log("dbResponse", dbResponse);
  return dbResponse;
}
async function recordCountDB() {
  const sql = `SELECT COUNT(id) AS "Products in table"  FROM ${table}`;
  const [dbResponse] = await dbQuery(sql, showLog);
  //   console.log("dbResponse", dbResponse);
  return dbResponse;
}
async function createRecordDB(recordData) {
  const sql = `INSERT INTO ${table} (image_url, title, description, price) VALUES (?, ?, ?, ?)`;
  const dbResponse = await dbExecute(sql, Object.values(recordData), showLog);
  //   console.log("dbResponse", dbResponse);

  return dbResponse;
}
async function deleteRecordDB(recordId) {
  const sql = `DELETE FROM ${table} WHERE id = ?`;
  const dbResponse = await dbExecute(sql, [recordId], showLog);
  return dbResponse;
}

module.exports = {
  getAllRecordsDB,
  recordCountDB,
  createRecordDB,
  deleteRecordDB,
};
