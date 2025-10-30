module.exports = (mongoose) => {
  const schema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      type: { type: String, required: true },
      description: { type: String, required: true },
    },
    {
      collection: "disease",
      timestamps: false,
    }
  );

  const Disease = mongoose.model("Disease", schema);
  return Disease;
};
