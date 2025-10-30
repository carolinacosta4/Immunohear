const db = require("../models/index.js");
const mongoose = require("mongoose");
const Appointment = db.Appointment;

const handleErrorResponse = (res, error) => {
  return res
    .status(500)
    .json({ success: false, msg: error.message || "Some error occurred." });
};

exports.findAll = async (req, res) => {
  try {
    const appointments = await Appointment.find().exec();

    return res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

exports.createAppointment = async (req, res) => {
  try {
    if (Object.values(req.body).length == 0)
      return res.status(400).json({
        success: false,
        msg: "You need to provide the body with the request.",
      });

    if (
      !req.body.name ||
      !req.body.doctor ||
      !req.body.date ||
      !req.body.IDuser
    )
      return res.status(400).json({
        success: false,
        error: "Fields missing",
        msg: "You need to provide the name, doctor and date.",
      });

    let appointment = new Appointment({
      name: req.body.name,
      doctor: req.body.doctor,
      date: req.body.date,
      IDuser: req.body.IDuser,
    });

    const newAppointment = await appointment.save();

    return res.status(201).json({
      success: true,
      msg: "Appointment created successfully.",
      data: newAppointment,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

exports.findUserAppointments = async (req, res) => {
  try {
    if (req.query.date) {
      const queryDate = new Date(req.query.date);
      const start = new Date(queryDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(start);
      end.setDate(end.getDate() + 1);

      const appointments = await Appointment.find({
        date: { $gte: start, $lt: end },
      }).exec();

      return res.status(200).json({
        success: true,
        data: appointments,
      });
    }

    const userAppointments = await Appointment.find({
      IDuser: req.params.idU,
    }).exec();

    return res.status(200).json({
      success: true,
      data: userAppointments,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

exports.findAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      IDuser: req.params.idU,
      _id: req.params.idA,
    }).exec();

    return res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
