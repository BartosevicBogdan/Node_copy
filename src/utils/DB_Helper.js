const mysql = require("mysql2/promise");
const dbConfig = require("../configs/DBconfig");

async function pingDB(printErrorIfFunctionChatchError) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const isAuthorized = connection.connection.authorized;
    console.log(`Connection to DB successfully = ${isAuthorized}`);
    await connection.close();
  } catch (error) {
    console.warn("Catched error in DB_Helper/pingDB()");
    if (typeof printErrorIfFunctionChatchError === "boolean") {
      printErrorIfFunctionChatchError &&
        console.log("DB_Helper/pingDB() catcherd error: ", error);
    }
  }
}
async function dbQuery(sql, showLog) {
  try {
    showLog &&
      console.log(
        "file: DB_Helper. function:dbQuery. arguments: sql. sql= ",
        sql
      );
    showLog && typeof sql !== "string" && console.log("sql not a string");

    const connection = await mysql.createConnection(dbConfig);
    const dbResponse = await connection.query(sql);

    showLog &&
      console.log(
        "file: DB_Helper. function:dbQuery. Variable dbResponse =  ",
        dbResponse
      );

    await connection.close();
    return dbResponse;
  } catch (error) {
    console.warn("Catched error in DB_Helper/dbQuery()");
    return false;
  }
}
async function dbExecute(sql, argumentsInArray, showLog) {
  try {
    showLog &&
      console.log("file: DB_Helper. function:dbExecute. arguments: sql=", sql);
    showLog &&
      console.log(
        "file: DB_Helper. function:dbExecute. arguments: argumentsInArray= ",
        argumentsInArray
      );
    showLog && typeof sql !== "string" && console.log("sql not a string");

    const connection = await mysql.createConnection(dbConfig);
    const [dbResponse] = await connection.execute(sql, argumentsInArray);

    showLog &&
      console.log(
        "file: DB_Helper. function:dbExecute. Variable dbResponse =  ",
        dbResponse
      );
    showLog &&
      console.log(
        "file: DB_Helper. function:dbExecute. Variable dbResponse.affectedRows",
        dbResponse.affectedRows
      );

    await connection.close();
    if (dbResponse.affectedRows === 1) {
      return true;
    } else {
      console.log("file: DB_Helper. function:dbExecute. Unexpected response ");
      return false;
    }
  } catch (error) {
    console.warn("Catched error in DB_Helper/dbExecute()");
    return false;
  }
}
function successResponce(res, msg, data = [], status = 200) {
  res.status(status).json({
    success: true,
    msg,
    data,
  });
}
function failResponce(res, msg, err = "Something went wrong", status = 500) {
  res.status(status).json({
    success: false,
    msg,
    error: err,
  });
}

module.exports = {
  pingDB,
  dbQuery,
  dbExecute,
  successResponce,
  failResponce,
};
