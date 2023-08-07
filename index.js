import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './Models/schema.js';
import { games, authors, reviews } from './_db.js';

const resolvers = {
  // Resolver function.
  Query: {
    games() {
      return games;
    },
    reviews() {
      return reviews;
    },
    authors() {
      return authors;
    },
  },
};

//TODO:  server setup

const port = 4000;
const server = new ApolloServer({
  typeDefs, //* typeDefs -- Definations of types of data.
  resolvers, //* resolvers
});

const { url } = await startStandaloneServer(server, {
  listen: { port },
});

console.log(`Server running at port ${port}`);
