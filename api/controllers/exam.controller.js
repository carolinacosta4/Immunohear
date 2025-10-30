const db = require("../models/index.js");
const mongoose = require("mongoose");
const Exam = db.Exam;
const UserExam = db.UserExam;

const handleErrorResponse = (res, error) => {
  return res
    .status(500)
    .json({ success: false, msg: error.message || "Some error occurred." });
};

exports.findAll = async (req, res) => {
  try {
    const exams = await Exam.find().exec();

    return res.status(200).json({
      success: true,
      data: exams,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

exports.createExam = async (req, res) => {
  try {
    if (Object.values(req.body).length == 0)
      return res.status(400).json({
        success: false,
        msg: "You need to provide the body with the request.",
      });

    if (!req.body.name)
      return res.status(400).json({
        success: false,
        error: "Fields missing",
        msg: "You need to provide the name of the exam.",
      });

    const examFound = await Exam.findOne({ name: req.body.name });
    if (examFound)
      return res.status(400).json({
        success: false,
        error: "Exam already existant",
      });

    let exam = new Exam({
      name: req.body.name,
    });

    const newExam = await exam.save();

    return res.status(201).json({
      success: true,
      msg: "Exam created successfully.",
      data: newExam,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

exports.addExamToUser = async (req, res) => {
  try {
    if (Object.values(req.body).length == 0)
      return res.status(400).json({
        success: false,
        msg: "You need to provide the body with the request.",
      });

    if (!req.body.IDexam || !req.body.file)
      return res.status(400).json({
        success: false,
        error: "Fields missing",
        msg: "You need to provide the IDexam and file.",
      });

    let userExam = new UserExam({
      IDuser: req.params.idU,
      IDexam: req.body.IDexam,
      file: req.body.file,
    });

    const newUserExam = await userExam.save();

    return res.status(201).json({
      success: true,
      msg: "Exam added to user successfully.",
      data: newUserExam,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

exports.findUserExams = async (req, res) => {
  try {
    const userExams = await UserExam.find({
      IDuser: req.params.idU,
    })
      .populate("IDexam", "-__v")
      .exec();

    return res.status(200).json({
      success: true,
      data: userExams,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

exports.findExam = async (req, res) => {
  try {
    const exam = await UserExam.findOne({
      IDuser: req.params.idU,
      _id: req.params.idE,
    })
      .populate("IDexam", "-__v")
      .exec();

    return res.status(200).json({
      success: true,
      data: exam,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
