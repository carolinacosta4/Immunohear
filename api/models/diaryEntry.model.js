module.exports = (mongoose) => {
  const schema = new mongoose.Schema(
    {
      text: { type: String, required: true },
      IDuser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      IDFeeling: { type: mongoose.Schema.Types.ObjectId, ref: "Feeling" },
    },
    {
      collection: "diaryEntry",
      timestamps: true,
    }
  );

  const DiaryEntry = mongoose.model("DiaryEntry", schema);
  return DiaryEntry;
};
