module.exports = (mongoose) => {
  const schema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      image: { type: String },
      cloudinaryID: { type: String },
    },
    {
      collection: "feeling",
      timestamps: false,
    }
  );

  const Feeling = mongoose.model("Feeling", schema);
  return Feeling;
};
