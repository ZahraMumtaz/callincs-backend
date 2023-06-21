require("dotenv").config();
const User = require("../models/user");
const Call = require("../models/call");
const Note = require("../models/note");

const seedUsers = async () => {
  try {
    await User.deleteMany();
    await Note.deleteMany();
    await Call.deleteMany();

    const users = [
      {
        email: "user1@example.com",
        password:
          "$2a$12$.VEVYmb8.dCa4oAMmaQG2uP09yw/7L.w.YsHbKjsEGDcVqKU7E.dK",
      },
      {
        email: "user2@example.com",
        password:
          "$2a$12$.VEVYmb8.dCa4oAMmaQG2uP09yw/7L.w.YsHbKjsEGDcVqKU7E.dK",
      },
      {
        email: "user3@example.com",
        password:
          "$2a$12$.VEVYmb8.dCa4oAMmaQG2uP09yw/7L.w.YsHbKjsEGDcVqKU7E.dK",
      },
    ];

    const notes = [
      {
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      },
      {
        content:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
      },
      {
        content:
          "There are many variations of passages of Lorem Ipsum available",
      },
      {
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      },
      {
        content: "Excepteur sint occaecat cupidatat non proident",
      },
    ];

    await User.insertMany(users);
    await Note.insertMany(notes);

    const noteIds = [];
    const createdNotes = await Note.find({}).limit(1);
    createdNotes.forEach((note) => noteIds.push(note._id));

    const calls = [
      {
        direction: "outbound",
        from: "+1-626-555-0178",
        to: "+1-626-555-0132",
        duration: 4860,
        is_archived: false,
        call_type: "voice mail",
        via: "+1-626-555-0178",
        notes: noteIds,
      },
      {
        direction: "inbound",
        from: "+1-626-555-0178",
        to: "+1-626-555-0132",
        duration: 4820,
        is_archived: true,
        call_type: "answered",
        via: "+1-626-555-0178",
        notes: noteIds,
      },
      {
        direction: "inbound",
        from: "+1-626-555-0178",
        to: "+1-626-555-0132",
        duration: 4860,
        is_archived: false,
        call_type: "missed",
        via: "+1-626-555-0178",
        notes: noteIds,
      },
      {
        direction: "outbound",
        from: "+1-626-555-0185",
        to: "+1-626-555-0189",
        duration: 4860,
        is_archived: true,
        call_type: "missed",
        via: "+1-626-555-0189",
        notes: noteIds,
      },
      {
        direction: "outbound",
        from: "+1-626-555-0185",
        to: "+1-626-555-0189",
        duration: 4860,
        is_archived: true,
        call_type: "missed",
        via: "+1-626-555-0189",
        notes: noteIds,
      },
      {
        direction: "outbound",
        from: "+1-626-555-0185",
        to: "+1-626-555-0189",
        duration: 4860,
        is_archived: true,
        call_type: "missed",
        via: "+1-626-555-0189",
        notes: noteIds,
      },
      {
        direction: "outbound",
        from: "+1-626-555-0185",
        to: "+1-626-555-0189",
        duration: 4860,
        is_archived: true,
        call_type: "missed",
        via: "+1-626-555-0189",
        notes: noteIds,
      },
      {
        direction: "outbound",
        from: "+1-626-555-0185",
        to: "+1-626-555-0189",
        duration: 4860,
        is_archived: true,
        call_type: "missed",
        via: "+1-626-555-0189",
        notes: noteIds,
      },
      {
        direction: "outbound",
        from: "+1-626-555-0185",
        to: "+1-626-555-0189",
        duration: 4860,
        is_archived: true,
        call_type: "missed",
        via: "+1-626-555-0189",
        notes: noteIds,
      },
      {
        direction: "outbound",
        from: "+1-626-555-0185",
        to: "+1-626-555-0189",
        duration: 4860,
        is_archived: true,
        call_type: "missed",
        via: "+1-626-555-0189",
        notes: noteIds,
      },
      {
        direction: "outbound",
        from: "+1-626-555-0185",
        to: "+1-626-555-0189",
        duration: 4860,
        is_archived: true,
        call_type: "missed",
        via: "+1-626-555-0189",
        notes: noteIds,
      },
      {
        direction: "outbound",
        from: "+1-626-555-0185",
        to: "+1-626-555-0189",
        duration: 4860,
        is_archived: true,
        call_type: "missed",
        via: "+1-626-555-0189",
        notes: noteIds,
      },
      {
        direction: "outbound",
        from: "+1-626-555-0185",
        to: "+1-626-555-0189",
        duration: 4860,
        is_archived: true,
        call_type: "missed",
        via: "+1-626-555-0189",
        notes: noteIds,
      },
      {
        direction: "outbound",
        from: "+1-626-555-0185",
        to: "+1-626-555-0189",
        duration: 4860,
        is_archived: true,
        call_type: "missed",
        via: "+1-626-555-0189",
        notes: noteIds,
      },
      {
        direction: "outbound",
        from: "+1-626-555-0185",
        to: "+1-626-555-0189",
        duration: 4860,
        is_archived: true,
        call_type: "missed",
        via: "+1-626-555-0189",
        notes: noteIds,
      },
      {
        direction: "outbound",
        from: "+1-626-555-0185",
        to: "+1-626-555-0189",
        duration: 4860,
        is_archived: true,
        call_type: "missed",
        via: "+1-626-555-0189",
        notes: noteIds,
      },
      {
        direction: "outbound",
        from: "+1-626-555-0185",
        to: "+1-626-555-0189",
        duration: 4860,
        is_archived: true,
        call_type: "missed",
        via: "+1-626-555-0189",
        notes: noteIds,
      },
      {
        direction: "outbound",
        from: "+1-626-555-0185",
        to: "+1-626-555-0189",
        duration: 4860,
        is_archived: true,
        call_type: "missed",
        via: "+1-626-555-0189",
        notes: noteIds,
      },
      {
        direction: "outbound",
        from: "+1-626-555-0185",
        to: "+1-626-555-0189",
        duration: 4860,
        is_archived: true,
        call_type: "missed",
        via: "+1-626-555-0189",
        notes: noteIds,
      },
      {
        direction: "outbound",
        from: "+1-626-555-0185",
        to: "+1-626-555-0189",
        duration: 4860,
        is_archived: true,
        call_type: "missed",
        via: "+1-626-555-0189",
        notes: noteIds,
      },
      {
        direction: "outbound",
        from: "+1-626-555-0185",
        to: "+1-626-555-0189",
        duration: 4860,
        is_archived: true,
        call_type: "missed",
        via: "+1-626-555-0189",
        notes: noteIds,
      },
      {
        direction: "outbound",
        from: "+1-626-555-0185",
        to: "+1-626-555-0189",
        duration: 4860,
        is_archived: true,
        call_type: "missed",
        via: "+1-626-555-0189",
        notes: noteIds,
      },
      {
        direction: "inbound",
        from: "+1-626-555-0165",
        to: "+1-626-555-0189",
        duration: 4860,
        is_archived: false,
        call_type: "missed",
        via: "+1-626-555-0189",
        notes: [],
      },
      {
        direction: "inbound",
        from: "+1-626-555-0165",
        to: "+1-626-555-0189",
        duration: 4860,
        is_archived: false,
        call_type: "missed",
        via: "+1-626-555-0189",
        notes: [],
      },
    ];

    await Call.insertMany(calls);

    console.log("record inserted successfully");
    return "Data seeded successfully";
  } catch (error) {
    console.error("Error seeding users:", error);
    return error;
  }
};

module.exports = {
  seedUsers,
};
