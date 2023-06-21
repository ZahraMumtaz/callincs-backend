const mongoose = require("mongoose");

const CallSchema = new mongoose.Schema({
  direction: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  duration: { type: Number, required: true },
  is_archived: { type: Boolean, required: true },
  call_type: { type: String, required: true },
  via: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
      required: false,
    },
  ],
});

const Call = mongoose.model("Call", CallSchema);

module.exports = Call;
