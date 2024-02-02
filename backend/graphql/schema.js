const { gql } = require("graphql-tag");

const typeDefs = gql`
  type User {
    id: ID
    email: String!
    password: String!
    last_name: String!
    first_name: String!
    creation_date: String
  }
  type Query {
    Users: [User]
    User(id: ID!): User
  }

  type Mutation {
    login(email: String!, password: String!): User!
    register(
      email: String!
      password: String!
      first_name: String!
      last_name: String!
    ): User!
  }
`;

module.exports = typeDefs;
