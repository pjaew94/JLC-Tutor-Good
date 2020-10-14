const mongoose = require("mongoose");
const { DateTime } = require('luxon');
const Schema = mongoose.Schema;

var dt = DateTime.local()

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  subject: {
    type: String,
    required: true
  },
  homework: {
    type: String,
    required: true,
  },
  name: {
    type: String
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      date: {
        type: String,
        default: dt.toLocaleString()
      },
    },
  ],
  due: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: dt.toLocaleString()
  },
  dateSeconds: {
    type: String,
    default: dt.toISODate()
  }
});

module.exports = Post = mongoose.model('post', PostSchema);