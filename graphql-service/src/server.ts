import 'reflect-metadata';
import * as _ from 'lodash';
import { ApolloServer } from 'apollo-server';
import { connect } from 'mongoose';
import { ObjectId } from 'mongodb';
import * as path from 'path';
import { buildSchema } from 'type-graphql';

import { UserResolver } from './resolvers/user-resolver';
import { User } from './entities/user';
import { seedDatabase } from './utils/helpers';
import { TypegooseMiddleware } from './typegoose-middleware';
import { ObjectIdScalar } from './utils/object-id.scalar';

export interface Context {
    user: User;
}

async function bootstrap() {

    try {
        const authSource = (process.env.MONGO_ENV === 'dev') ? `?authSource=${process.env.MONGO_ROOT_DB}` : '';
        const mongo = {
            url: `mongodb://${process.env.MONGO_ROOT_USER}:${process.env.MONGO_ROOT_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_APP_DB}${authSource}`,
            opts: {
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            }
        }
        // create mongoose connection
        const mongoose = await connect(mongo.url, mongo.opts);

        // clean and seed database
        await mongoose.connection.db.dropDatabase();
        const { defaultUser } = await seedDatabase();

        // build TypeGraphQL executable schema
        const schema = await buildSchema({
            resolvers: [UserResolver],
            emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
            globalMiddlewares: [TypegooseMiddleware],
            scalarsMap: [{
                type: ObjectId,
                scalar: ObjectIdScalar
            }],
        });

        const context: Context = {
            user: defaultUser
        };

        // create GraphQL server
        const server = new ApolloServer({
            schema,
            context
        });

        const { url } = await server.listen(process.env.GQL_PORT);
        console.log(`Server is running, GraphQL Playground available at ${url}`);
    } catch (err) {
        console.log(err);
    }

}

bootstrap();
