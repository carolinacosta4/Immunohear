module.exports = (mongoose) => {
  const schema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      profilePicture: { type: String },
      cloudinaryID: { type: String },
      language: { type: String, default: 'EN' },
      isDeactivated: { type: Boolean, default: false, required: true },
    },
    {
      collection: "user",
      timestamps: false,
    }
  );

  const User = mongoose.model("User", schema);
  return User;
};

