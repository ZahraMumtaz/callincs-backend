require("dotenv").config();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const seeder = require("../seeders/seed");

const userResolvers = {
  Query: {
    me: (parent, args, context) => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }
      return context.user;
    },
  },
  Mutation: {
    seedData: async () => {
      return await seeder.seedUsers();
    },

    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email: email });

      if (!user) {
        throw new Error("Invalid email or password");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new Error("Invalid email or password");
      }

      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "10m",
        }
      );

      return { access_token: token, user: user };
    },
    refreshToken: async (parent, args, context) => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }

      const token = jwt.sign(
        { id: context.user._id, email: context.user.email },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "10m",
        }
      );

      return { access_token: token, user: context.user };
    },
  },
};

module.exports = userResolvers;
