const { default: mongoose } = require("mongoose");

const validator = require("validator");
const User = require("./User");
const Schema = mongoose.Schema;

const ConversationSchema = new Schema(
  {
    conversationName: {
      type: String,
      trim: true, //enlever les espace
      default: "conversation_name",
    },

    isGroup: { type: Boolean, default: false },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    users: [{ type: mongoose.SchemaTypes.ObjectID, ref: "User" }], // one  to many (one reunion to many participants)

    messages: [
      {
        type: String,
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        content: { type: String },
        datesent: {
          type: Date,
          default: () => Date.now(),
          immutable: true,
        }, //cant change the value of creationdate
      },
    ],
    videocalls: [
      {
        sender_call: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        participant: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        datebegin: {
          type: Date,

          immutable: true,
        }, //cant change the value of creationdate

        duration: {
          type: Number,
        }, //cant change the value of creationdate}
      },
    ],
    archive: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const Conversation = mongoose.model("Conversation", ConversationSchema);
module.exports = Conversation;
