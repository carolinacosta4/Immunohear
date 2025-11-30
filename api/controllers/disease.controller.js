const db = require("../models/index.js");
const mongoose = require("mongoose");
const Disease = db.Disease;
const UserDisease = db.UserDisease;

const handleErrorResponse = (res, error) => {
  return res
    .status(500)
    .json({ success: false, msg: error.message || "Some error occurred." });
};

exports.findAll = async (req, res) => {
  try {
    const diseases = await Disease.find().exec();

    return res.status(200).json({
      success: true,
      data: diseases,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

exports.createDisease = async (req, res) => {
  try {
    if (Object.values(req.body).length == 0)
      return res.status(400).json({
        success: false,
        msg: "You need to provide the body with the request.",
      });

    if (!req.body.name || !req.body.type || !req.body.description)
      return res.status(400).json({
        success: false,
        error: "Fields missing",
        msg: "You need to provide the name, type and description of the disease.",
      });

    const diseaseFound = await Disease.findOne({ name: req.body.name });
    if (diseaseFound)
      return res.status(400).json({
        success: false,
        error: "Disease already existant",
      });

    let disease = new Disease({
      name: req.body.name,
      type: req.body.type,
      description: req.body.description,
    });

    const newDisease = await disease.save();

    return res.status(201).json({
      success: true,
      msg: "Disease created successfully.",
      data: newDisease,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

exports.addDiseaseToUser = async (req, res) => {
  try {
    if (Object.values(req.body).length == 0)
      return res.status(400).json({
        success: false,
        msg: "You need to provide the body with the request.",
      });

    if (
      !req.body.IDdisease ||
      req.body.vestibular == null ||
      !req.body.affected ||
      !req.body.tinnitus == null
    )
      return res.status(400).json({
        success: false,
        error: "Fields missing",
        msg: "You need to provide the IDdisease, vestibular, affected and tinnitus of the disease.",
      });

    const userDiseaseFound = await UserDisease.findOne({
      IDdisease: req.body.IDdisease,
      IDuser: req.params.idU
    });
    if (userDiseaseFound)
      return res.status(400).json({
        success: false,
        error: "Disease already added to user",
      });

    let userDisease = new UserDisease({
      IDuser: req.params.idU,
      IDdisease: req.body.IDdisease,
      vestibular: req.body.vestibular,
      affected: req.body.affected,
      tinnitus: req.body.tinnitus,
    });

    const newUserDisease = await userDisease.save();

    return res.status(201).json({
      success: true,
      msg: "Disease added to user successfully.",
      data: newUserDisease,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

exports.findUserDiseases = async (req, res) => {
  try {
    const userDiseases = await UserDisease.find({ IDuser: req.params.idU })
      .populate("IDdisease", "-__v")
      .exec();

    return res.status(200).json({
      success: true,
      data: userDiseases,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

exports.findDisease = async (req, res) => {
  try {
    const disease = await UserDisease.findOne({
      IDuser: req.params.idU,
      _id: req.params.idD,
    })
      .populate("IDdisease", "-__v")
      .exec();

    return res.status(200).json({
      success: true,
      data: disease,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
