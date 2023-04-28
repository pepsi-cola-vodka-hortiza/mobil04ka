const { gql } = require("apollo-server-express");

module.exports = gql`
  scalar DateTime
  type User {
    id: ID!
    username: String!
    email: String!
    avatar: String
    notes: [Note!]!
    favorites: [Note!]!
  }
  type Note {
    id: ID!
    content: String!
    author: User!
    createdAt: DateTime!
    updatedAt: DateTime!
    favoriteCount: Int!
    favoritedBy: [User]
    comments: [Comment]
  }
  type Comment {
    id: ID!
    author: User!
    createdAt: DateTime!
    updatedAt: DateTime!
    text: String!
  }
  type Query {
    notes: [Note]
    note(id: ID!): Note!
    users: [User]
    user(username: String!): User
    me: User!
  }
  type Mutation {
    signUp(username: String!, email: String!, password: String!): String!
    signIn(username: String, email: String, password: String!): String!
    createNote(content: String!): Note!
    deleteNote(id: ID!): Boolean!
    updateNote(id: ID!, content: String!): Boolean!
    toggleFavorite(id: ID!): Note!
    addComment(id: ID!, text: String!): Note!
  }
`;
