const db = require("../models/index.js");
const config = require("../config/db.config.js");
const Tip = db.Tip;
const TipCategory = db.TipCategory;

const handleErrorResponse = (res, error) => {
  return res
    .status(500)
    .json({ success: false, msg: error.message || "Some error occurred." });
};

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: config.C_CLOUD_NAME,
  api_key: config.C_API_KEY,
  api_secret: config.C_API_SECRET,
});

exports.findAll = async (req, res) => {
  try {
    const tips = await Tip.find().populate("IDcategory", "-_v").exec();

    if (!tips) {
      return res.status(200).json({
        success: false,
        msg: "No tips found",
      });
    }

    return res.status(200).json({
      success: true,
      data: tips,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

exports.findOne = async (req, res) => {
  try {
    const tip = await Tip.findOne({ _id: req.params.idT })
      .populate("IDcategory", "-_id -__v")
      .exec();

    if (!tip) {
      return res.status(404).json({
        success: false,
        msg: "Tip not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: tip,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

exports.addTip = async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.info ||
      !req.body.IDcategory ||
      !req.body.image ||
      !req.body.description ||
      !req.body.author
    ) {
      return res.status(400).json({
        success: false,
        msg: "Missing some required information",
      });
    }

    let existingCategory = await TipCategory.findOne({
      _id: req.body.IDcategory,
    });
    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        msg: "Category not found",
      });
    }
    const uploadResult = await cloudinary.uploader.upload(req.body.image);

    if (!uploadResult) {
      return res.status(400).json({
        success: false,
        msg: "Could not upload image",
      });
    }

    let newTip = await Tip.create({
      title: req.body.title,
      info: req.body.info,
      IDcategory: req.body.IDcategory,
      image: uploadResult.secure_url,
      cloudinary_id: uploadResult.public_id,
      description: req.body.description,
      author: req.body.author,
    });

    return res.status(201).json({
      success: true,
      msg: "Tip created successfully.",
      data: newTip,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
