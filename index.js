import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

//TODO:  server setup

const port = 4000;
const server = new ApolloServer({
    //* typeDefs -- Definations of types of data.
    //* resolvers
});

const { url } = await startStandaloneServer(server, {
  listen: { port },
});

console.log(`Server running at port ${port}`);
