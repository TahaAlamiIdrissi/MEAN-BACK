const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    min: 3
  },
  email: {
    type: String,
    required: true,
    min: 6
  },
  password: {
      type: String,
      required: true,
      min: 4
  },
  date: {
      type: Date,
      default: Date.now()
  }
});


module.exports = mongoose.model("user",userSchema);
