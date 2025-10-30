module.exports = (mongoose) => {
  const schema = new mongoose.Schema(
    {
      IDuser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      IDdisease: { type: mongoose.Schema.Types.ObjectId, ref: "Disease" },
      vestibular: { type: Boolean, required: true },
      affected: { type: String, required: true },
      tinnitus: { type: Boolean, required: true },
    },
    {
      collection: "userDisease",
      timestamps: true,
    }
  );

  const UserDisease = mongoose.model("UserDisease", schema);
  return UserDisease;
};
