require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const userSchema = require("./graphql/userSchema.graphql");
const callSchema = require("./graphql/callSchema.graphql");
const userResolvers = require("./resolvers/userResolvers");
const callResolvers = require("./resolvers/callResolvers");
const jwt = require("jsonwebtoken");
const { execute, subscribe } = require("graphql");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { PubSub } = require("graphql-subscriptions");
const { pubsub } = require("./pubsub");
const { makeExecutableSchema } = require("graphql-tools");

const _schema = makeExecutableSchema({
  typeDefs: callSchema,
  resolvers: callResolvers,
});

mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

// Create an Express app
const app = express();

app.use(cors());

// Create an Apollo Server
const server = new ApolloServer({
  typeDefs: [userSchema, callSchema],
  resolvers: [userResolvers, callResolvers],
  introspection: true,
  context: async ({ req }) => {
    const token = req.headers.authorization || "";
    try {
      if (
        req.body.operationName === "loginUser" ||
        req.body.operationName === "seedData"
      ) {
        return {};
      }

      const user = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET_KEY);
      return { user, pubsub };
    } catch (error) {
      throw new Error("Authentication failed.");
    }
  },
});

// Start the server and then apply middleware
async function startServer() {
  await server.start();

  // Apply the Apollo Server as a middleware to Express
  server.applyMiddleware({ app });

  const httpServer = app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
  });

  // Create the WebSocket server for subscriptions
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema: _schema,
      onConnect: (connectionParams, webSocket, context) => {
        console.log("Socket connected");
      },
      onDisconnect: (webSocket, context) => {
        console.log("Socket disconnected");
      },
    },
    {
      server: httpServer,
      path: server.subscriptionsPath,
    }
  );
}

startServer();
