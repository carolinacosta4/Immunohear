module.exports = (mongoose) => {
  const schema = new mongoose.Schema(
    {
      title: { type: String, required: true },
      info: { type: String },
      IDcategory: { type: mongoose.Schema.Types.ObjectId, ref: "TipCategory" },
      image: { type: String },
      cloudinaryID: { type: String },
      description: { type: String, default: "", required: true },
      author: { type: String, default: "Anonymous", required: true },
    },
    {
      collection: "tip",
      timestamps: true,
    }
  );
  const Tip = mongoose.model("Tip", schema);
  return Tip;
};