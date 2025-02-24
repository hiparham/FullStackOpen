require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const connectDb = require("./Database/Connectdb");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const typeDefs = require("./Schema");
const resolvers = require("./Resolvers");

const server = new ApolloServer({ typeDefs, resolvers });
connectDb().then(() => {
  startStandaloneServer(server, {
    context: async ({ req, res }) => {
      let auth = req ? req.headers.authorization : null;
      if (auth && auth.startsWith("Bearer ")) {
        const decoded = jwt.verify(auth.slice(7), process.env.JWT_SECRET);
        const currentUser = await User.findById(decoded.id);
        return currentUser;
      }
    },
    listen: {
      port: 4000,
    },
  }).then(({ url }) => {
    console.log(`Server Running at ${url}`);
  });
});
