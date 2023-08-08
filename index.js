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
    review(_, args) {
      return reviews.find((review) => review.id === args.id);
    },
    game(_, args) {
      return games.find((game) => game.id === args.id);
    },
    author(_, args) {
      return authors.find((author) => author.id === args.id);
    },
  },
  Game: {
    reviews(parent) {
      return reviews.filter((r) => r.game_id === parent.id);
    },
  },
  Author: {
    reviews(parent) {
      return reviews.filter((r) => r.author_id === parent.id);
    },
  },
  Review: {
    author(parent) {
      return authors.find((a) => a.id === parent.author_id);
    },
    game(parent) {
      return games.find((g) => g.id === parent.game_id);
    },
  },
  Mutation: {
    deleteGame(_, args) {
      return games.filter((g) => g.id !== args.id);
    },
    addGame(_, args) {
      let game = {
        ...args.game,
        id: Math.floor(Math.random() * 1000).toString(),
      };
      games.push(game);
      return game;
    },
    updateGame(_, args) {
      games.map((g) => {
        if (g.id === args.id) {
          return { ...g, ...args.edit };
        }
        return g;
      });
      return games.find((g) => g.id === args.id);
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
