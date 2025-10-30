const db = require("../models/index.js");
const mongoose = require("mongoose");
const Feeling = db.Feeling;

const handleErrorResponse = (res, error) => {
  return res
    .status(500)
    .json({ success: false, msg: error.message || "Some error occurred." });
};

exports.findAll = async (req, res) => {
  try {
    const feelings = await Feeling.find().exec();

    return res.status(200).json({
      success: true,
      data: feelings,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

exports.createFeeling = async (req, res) => {
  try {
    if (Object.values(req.body).length == 0)
      return res.status(400).json({
        success: false,
        msg: "You need to provide the body with the request.",
      });

    if (!req.body.name || !req.body.description || !req.body.image)
      return res.status(400).json({
        success: false,
        error: "Fields missing",
        msg: "You need to provide the name, description and image.",
      });

    let feeling = new Feeling({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image, 
    });

    const newFeeling = await feeling.save();

    return res.status(201).json({
      success: true,
      msg: "Feeling created successfully.",
      data: newFeeling,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};