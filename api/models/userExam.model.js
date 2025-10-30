module.exports = (mongoose) => {
  const schema = new mongoose.Schema(
    {
      IDuser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      IDexam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam" },
      file: { type: String },
      cloudinaryID: { type: String },
    },
    {
      collection: "userExam",
      timestamps: true,
    }
  );

  const UserExam = mongoose.model("UserExam", schema);
  return UserExam;
};