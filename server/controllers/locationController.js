const { Country, State, Region } = require("../models");

// ✅ CREATE a New Country
exports.createCountry = async (req, res) => {
  try {
    const { CountryName } = req.body;
    const country = await Country.create({ CountryName });
    res.status(201).json({ message: "Country added successfully", country });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET All Countries
exports.getAllCountries = async (req, res) => {
  try {
    const countries = await Country.findAll();
    res.json(countries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ CREATE a New State
exports.createState = async (req, res) => {
  try {
    const { StateName, CountryId } = req.body;
    const state = await State.create({ StateName, CountryId });
    res.status(201).json({ message: "State added successfully", state });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET All States
exports.getAllStates = async (req, res) => {
  try {
    const states = await State.findAll();
    res.json(states);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ CREATE a New Region
exports.createRegion = async (req, res) => {
  try {
    const { RegionName, CountryId } = req.body;
    const region = await Region.create({ RegionName, CountryId });
    res.status(201).json({ message: "Region added successfully", region });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET All Regions
exports.getAllRegions = async (req, res) => {
  try {
    const regions = await Region.findAll();
    res.json(regions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
