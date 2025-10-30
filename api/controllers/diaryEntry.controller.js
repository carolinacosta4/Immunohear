const db = require("../models/index.js");
const config = require("../config/db.config.js");
const mongoose = require("mongoose");
const Diary = db.DiaryEntry;

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: config.C_CLOUD_NAME,
  api_key: config.C_API_KEY,
  api_secret: config.C_API_SECRET,
});

const handleErrorResponse = (res, error) => {
  return res
    .status(500)
    .json({ success: false, msg: error.message || "Some error occurred." });
};

exports.findAll = async (req, res) => {
  try {
    const entries = await Diary.find().exec();

    return res.status(200).json({
      success: true,
      data: entries,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

exports.createDiary = async (req, res) => {
  try {
    if (Object.values(req.body).length == 0)
      return res.status(400).json({
        success: false,
        msg: "You need to provide the body with the request.",
      });

    if (!req.body.text || !req.body.IDfeeling)
      return res.status(400).json({
        success: false,
        error: "Fields missing",
        msg: "You need to provide the text and IDfeeling.",
      });

    let diary = new Diary({
      text: req.body.text,
      IDuser: req.loggedUserId,
      IDfeeling: req.body.IDfeeling,
    });

    const newDiary = await diary.save();

    return res.status(201).json({
      success: true,
      msg: "Diary created successfully.",
      data: newDiary,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

exports.findUserEntries = async (req, res) => {
  try {
    if (req.query.date) {
      const queryDate = new Date(req.query.date);
      const start = new Date(queryDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(start);
      end.setDate(end.getDate() + 1);

      const entries = await Diary.findOne({
        createdAt: { $gte: start, $lt: end },
      }).exec();

      return res.status(200).json({
        success: true,
        data: entries,
      });
    }
    
    const userEntries = await Diary.find({ IDuser: req.params.idU }).exec();

    return res.status(200).json({
      success: true,
      data: userEntries,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

exports.findEntry = async (req, res) => {
  try {
    const entry = await Diary.findOne({
      IDuser: req.params.idU,
      _id: req.params.idE,
    }).exec();

    return res.status(200).json({
      success: true,
      data: entry,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
