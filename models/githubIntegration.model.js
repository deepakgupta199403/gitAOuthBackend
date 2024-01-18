const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GithubIntegrationSchema = new Schema(
  {
    accessToken: { type: String },
    tokenType: { type: String },
    scope: { type: String }
  },
  {
    timestamps: true,
  }
);

GithubIntegrationSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model("GithubIntegration", GithubIntegrationSchema);
