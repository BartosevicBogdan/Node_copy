const {
  getAllRecordsDB,
  recordCountDB,
  createRecordDB,
  deleteRecordDB,
} = require("../model/productsModel");
const { successResponce, failResponce } = require("../utils/DB_Helper");

const showLog = false;

async function getAllRecords(req, res) {
  const dbResponse = await getAllRecordsDB();
  showLog &&
    console.log(
      "file: productsController. function: getAllRecords. dbResponse = await getAllRecordsDB. dbResponse =",
      dbResponse
    );
  const output = {
    msg: "Answer to /products GET request endpoint",
    data: dbResponse,
  };
  dbResponse
    ? successResponce(res, output.msg, output.data)
    : failResponce(res, output.msg);
}
async function recordCount(req, res) {
  const [dbResponse] = await recordCountDB();
  showLog &&
    console.log(
      "file: productsController. function: recordCount. dbResponse = await recordCountDB. dbResponse =",
      dbResponse
    );
  const output = {
    msg: "Answer to /totalproducts GET request endpoint",
    data: dbResponse,
  };
  dbResponse
    ? successResponce(res, output.msg, output.data)
    : failResponce(res, output.msg);
}
async function createRecord(req, res) {
  const reqData = {
    image_url: req.body.image_url,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
  };
  const dbResponse = await createRecordDB(reqData);
  showLog &&
    console.log(
      "file: productsController. function: createRecord. dbResponse = await createRecordDB. dbResponse =",
      dbResponse
    );
  const output = {
    success: true,
    msg: "Answer to /products POST request endpoint.Create product with information",
    data: reqData,
  };
  dbResponse
    ? successResponce(res, output.msg, output.data)
    : failResponce(res, output.msg);
}
async function deleteRecord(req, res) {
  const dbResponse = await deleteRecordDB(req.params.id);
  showLog &&
    console.log(
      "file: productsController. function: deleteRecord. dbResponse = await deleteRecordDB. dbResponse =",
      dbResponse
    );
  const output = {
    success: true,
    msg: `Answer to /products/:id DELETE request endpoint. Delete product with ID=${req.params.id}`,
  };
  dbResponse ? successResponce(res, output.msg) : failResponce(res, output.msg);
}

module.exports = {
  getAllRecords,
  recordCount,
  createRecord,
  deleteRecord,
};
