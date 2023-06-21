const Call = require("../models/call");
const Note = require("../models/note");
const { pubsub } = require("./../pubsub");

const callResolvers = {
  Query: {
    calls: async (parent, { offset, limit, query }) => {
      const startDate = query?.startDate;
      const endDate = query?.endDate;

      if (startDate && endDate) {
        query.created_at = {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        };
        delete query?.startDate;
        delete query?.endDate;
      }


      const calls = await Call.find(query || {})
        .skip(offset || 0)
        .limit(limit || 10);

      const totalCount = await Call.find(query || {})
        .skip(offset || 0)
        .limit(limit || 10)
        .countDocuments();

      const hasNextPage = (offset || 0) + (limit || 10) < totalCount;
      return { nodes: calls, totalCount: totalCount, hasNextPage: hasNextPage };
    },

    call: async (parent, { id }) => {
      return await Call.findById(id);
    },
  },

  Mutation: {
    createNote: async (parent, { callId, content }) => {
      const call = await Call.findById(callId);

      if (!call) {
        throw new Error("Call not found");
      }

      const note = new Note({ content: content });
      call.notes.unshift(note);
      await call.save();
      await note.save();

      pubsub.publish(`CALL_UPDATED_${call._id}`, call);

      return call;
    },
    toggleArchiveCall: async (parent, { id }, context) => {
      const call = await Call.findById(id);

      if (!call) {
        throw new Error("Call not found");
      }

      call.is_archived = !call.is_archived;
      await call.save();

      pubsub.publish(`CALL_UPDATED_${call._id}`, call);

      return call;
    },
  },
  Call: {
    notes: async (parent) => {
      await parent.populate("notes");
      return parent.notes;
    },
  },

  Subscription: {
    onUpdateCall: {
      resolve: (payload, args, context, info) => {
        return payload;
      },
      subscribe: (_, { id }) => {
        return pubsub.asyncIterator(`CALL_UPDATED_${id}`);
      },
    },
  },
};

module.exports = callResolvers;
