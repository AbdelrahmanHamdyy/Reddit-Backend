import mongoose, { Schema } from "mongoose";

// eslint-disable-next-line new-cap
const commentSchema = mongoose.Schema({
  parentId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  parentType: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  numberOfVotes: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  editedAt: {
    type: Date,
  },
  deletedAt: {
    type: Date,
  },
  ownerUsername: {
    type: String,
    required: true,
  },
  markedSpam: {
    type: Boolean,
    required: true,
    default: false,
  },
  children: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
