module.exports = (mongoose) => {
  const schema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      doctor: { type: String, required: true },
      date: { type: Date, required: true },
      IDuser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    {
      collection: "appointment",
      timestamps: false,
    }
  );

  const Appointment = mongoose.model("Appointment", schema);
  return Appointment;
};
