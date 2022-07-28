"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const flashcard_1 = require("./entities/flashcard");
const flashcard_2 = require("./resolvers/flashcard");
const apollo_server_core_1 = require("apollo-server-core");
require("dotenv/config");
const main = async () => {
    const conn = await (0, typeorm_1.createConnection)({
        type: "postgres",
        url: process.env.DATABASE_URL,
        logging: true,
        synchronize: true,
        entities: [flashcard_1.FlashCards],
        port: 5432,
        extra: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            },
        },
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [flashcard_2.TaskResolver],
            validate: false,
        }),
        plugins: [(0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)()],
    });
    await apolloServer.start();
    const app = (0, express_1.default)();
    apolloServer.applyMiddleware({ app });
    app.get("/", (_req, res) => res.send("you have not screwed up!"));
    const PORT = process.env.PORT || 8001;
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
};
main().catch((err) => console.error(err));
//# sourceMappingURL=index.js.map