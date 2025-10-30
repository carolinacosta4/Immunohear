const db = require("../models/index.js");
const config = require("../config/db.config.js");
const mongoose = require("mongoose");
const TipCategory = db.TipCategory;

const handleErrorResponse = (res, error) => {
  return res
    .status(500)
    .json({ success: false, msg: error.message || "Some error occurred." });
};

exports.findAll = async (req, res) => {
  try {
    const categories = await TipCategory.find().exec();

    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

exports.findById = async (req, res) => {
  try {
    const category = await TipCategory.findById(req.params.idCT).exec();

    if (!category) {
      return res.status(404).json({
        success: false,
        msg: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: category.name,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

exports.addNewTipCategory = async (req, res) => {
  try {
    if (!req.body.name) {
      return res
        .status(400)
        .json({ success: false, msg: "A name is required" });
    }

    const existingCategory = await TipCategory.findOne({ name: req.body.name });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        msg: "A category with this name already exists.",
      });
    }

    let newCategory = await TipCategory.create({
      name: req.body.name,
    });

    return res.status(201).json({
      success: true,
      msg: "New category added successfully.",
      data: newCategory,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
