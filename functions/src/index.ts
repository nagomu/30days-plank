const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const serviceAccount = require(`${__dirname}/../serviceAccounts.json`);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://thirty-days-plank-v1.firebaseio.com',
});

const typeDefs = gql`
  type Archive {
    id: String!
    achievementRate: Int!
    challengeId: String!
    title: String!
  }

  type Query {
    archives(uid: String!): [Archive]
  }
`;

type Archive = {
  id: string;
  challengeId: string;
  title: string;
  achievementRate: number;
};

const resolvers = {
  Query: {
    // eslint-disable-next-line
    archives: async (_obj: any, args: any, _context: any, _info: any) => {
      const db = admin.firestore();
      const ref = db.collection(`/users/${args.uid}/archives`);
      const snapshot = await ref.get();

      const results: Archive[] = [];

      // eslint-disable-next-line
      snapshot.forEach((doc: any) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        } as Archive);
      });

      return results;
    },
  },
};

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: '/', cors: true });
exports.graphql = functions.https.onRequest(app);
