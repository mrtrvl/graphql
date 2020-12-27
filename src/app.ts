import express, { Request, Response } from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

const app = express();
const port: number = 3000;

const persons = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@doe.ee'
  }
];

const typeDefs = gql`
  type Person {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
  }
  type Query {
    allPersons: [Person!]!
  }
  type Mutation {
    createPerson(firstName: String!, lastName: String!, email: String!): Person!
  }
`;

const resolvers = {
  Query: {
    allPersons: () => {
      return persons;
    }
  },
  Mutation: {
    createPerson: (parent, args, context, info) => {
      const person = {
        id: persons.length + 1,
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email
      };
      persons.push(person);
      return person;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.get('/ping', (req: Request, res: Response) => {
  res.send('Responsive');
});

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});