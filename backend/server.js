require('dotenv').config()
const cors = require('cors');
const express = require('express')
const mongoose = require('mongoose')
const graphqlHTTP = require('express-graphql').graphqlHTTP
const { graphqlSchema, queryHandlers } = require('./schema/graphqlSchema')


const app = express()

//--- ENABLE CORS ---
app.use(cors());

const DB_CONNECT = process.env.DB_CONNECT
const PORT = process.env.PORT || 8081

//--- DATABASE CONNECTION ---
mongoose.connect(DB_CONNECT)
.then(() => console.log('--- MONGODB CONNECTED ---'))
.catch((error) => console.error(error.message))

//--- GRAPHQL ROUTE ---
app.use('/graphql', 
    
    graphqlHTTP ({

    schema: graphqlSchema,
    rootValue: queryHandlers,
    graphiql: true,

}));

//--- START SERVER ---
app.listen(PORT, () => console.log( `--- SERVER RUNNING ON: http://localhost:${PORT}/graphql` ));