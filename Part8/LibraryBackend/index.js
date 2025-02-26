require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const connectDb = require("./Database/Connectdb");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { createServer } = require("http");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const { WebSocketServer } = require("ws");
const setupdb = require("./Database/SetUpDb");
const { useServer } = require("graphql-ws/lib/use/ws");
const typeDefs = require("./Schema");
const cors = require("cors");
const express = require("express");
const resolvers = require("./Resolvers");
const start = async () => {
  const app = express();
  const httpServer = createServer(app);
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  });
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const serverCleanup = useServer({ schema }, wsServer);
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });
  await connectDb();
  await server.start();
  app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.startsWith("Bearer ")) {
          const userverified = jwt.verify(
            auth.slice(7),
            process.env.JWT_SECRET
          );
          const currentUser = await User.findById(userverified.id);
          return currentUser;
        }
        return null;
      },
    })
  );
  httpServer.listen(4000, () => {
    console.log(`Server Running at http://localhost:4000`);
  });
};
start();
