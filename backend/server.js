const app = require('./app');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schema')
const resolvers = require ('./graphql/resolvers')
require('./config/database');
const authMiddleware = require ('./middleware/authMiddleware')
const port = process.env.PORT || 3000;

// Error handling for invalid tokens
app.use('/graphql', (err, req, res, next) => {
  if (err && err.name === 'UnauthorizedError') {
    res.status(401).json({ message: 'Invalid or expired token' });
  } else {
    next(err);
  }
});

// Protect GraphQL endpoint with middleware
// app.use('/graphql', authMiddleware);


async function startServer() {

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start()
  server.applyMiddleware({ app });
  
  app.listen(port, () => {
      console.log(`server on port : ${port}/graphql`);
    });
}
startServer().catch(err => {
  console.error('Error starting server:', err);
});