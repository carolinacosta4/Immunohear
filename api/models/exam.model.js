module.exports = (mongoose) => {
  const schema = new mongoose.Schema(
    {
      name: { type: String },
    },
    {
      collection: "exam",
      timestamps: false,
    }
  );

  const Exam = mongoose.model("Exam", schema);
  return Exam;
};
