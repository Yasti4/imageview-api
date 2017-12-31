import {
	buildSchema
} from 'graphql';
import UserType from './types/user.type';
import UserQueries from './queries/user.query';
import UserResolvers from './resolvers/user.resolver';

const Types = [UserType].join('\n');
const Inputs = [].join('\n');
const Queries = [UserQueries].join('\n');
const Mutations = [].join('\n');
const Resolvers = Object.assign({}, UserResolvers);

export default {
	schema: buildSchema(`
        ${Types}
        ${Inputs}
        type Query {
            ${Queries}
        }
    `),

	// type Mutation {
	//     ${Mutations}
	// }
	rootValue: Resolvers,
	graphiql: true
};
