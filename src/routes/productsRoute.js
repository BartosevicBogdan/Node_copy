const express = require("express");
const {
  getAllRecords,
  recordCount,
  createRecord,
  deleteRecord,
} = require("../controller/productsController");

const router = express.Router();

router.get("/products", getAllRecords);
router.get("/totalproducts", recordCount);
router.post("/products", createRecord);
router.delete("/products/:id", deleteRecord);

module.exports = router;
