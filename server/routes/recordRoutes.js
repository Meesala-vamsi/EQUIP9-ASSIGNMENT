const express = require("express");
const {updateRecords, deleteRecord, fetchRecordById} = require("../controllers/recordsController");
const { resourceAccess } = require("../controllers/authController");
const router = express.Router();

router.put("/:id",resourceAccess,updateRecords);
router.get("/:id", fetchRecordById);
router.delete("/:id", deleteRecord);

module.exports = router;