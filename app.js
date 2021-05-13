const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors=require('cors');

const app = express();

//allow cross-origin requests
app.use(cors());

//connect our application
mongoose.connect(
    "mongodb+srv://admin:1234@cluster0.oj7ou.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
        useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology:true,
    }
);
mongoose.connection.once("open", () => {
  console.log("connected to the database");
});

//use middleware
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("listening to requests on port 4000");
});
