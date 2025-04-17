const express = require("express");
const router = express.Router();
const locationController = require("../controllers/locationController");

router.post("/country", locationController.createCountry);
router.get("/countries", locationController.getAllCountries);

router.post("/state", locationController.createState);
router.get("/states", locationController.getAllStates);

router.post("/region", locationController.createRegion);
router.get("/regions", locationController.getAllRegions);

module.exports = router;
