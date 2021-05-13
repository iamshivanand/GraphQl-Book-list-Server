const graphql = require("graphql");
const _ = require("lodash");
const Book = require("../models/book");
const Author = require("../models/author");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

//dummy data
// var books = [
//   { name: "Name of the wind", genre: "Fantasy", id: "1", authorid: "1" },
//   { name: "The final Empire", genre: "Fantasy", id: "2", authorid: "2" },
//   { name: "The Long Earth", genre: "Sci-Fi", id: "3", authorid: "3" },
//   { name: "The Hero of Ages", genre: "Fantasy", id: "4", authorid: "2" },
//   { name: "The colour of Magic", genre: "Fantasy", id: "5", authorid: "3" },
//   { name: "The Light Fantastic", genre: "fantasy", id: "6", authorid: "3" },
// ];
// var authors = [
//   { name: "Patrick Rothfuss", age: 44, id: "1" },
//   { name: "Brandon sanderson", age: 42, id: "2" },
//   { name: "Terry Pratchett", age: 66, id: "3" },
// ];
//create schema for BookType
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        //return _.find(authors, { id: parent.authorid });
        return Author.findById(parent.authorId);
      },
    },
  }),
});

//create Schema for author type
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        //return _.filter(books, { authorid: parent.id });
        return Book.find({ authorId: parent.id });
      },
    },
  }),
});

//create root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        //code to get data from db /other source
        //return _.find(books, { id: args.id });
        return Book.findById(args.id);
      },
    },
    author: {
      type: AuthorType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        //code to get data from db /other sources
        // return _.find(authors, { id: args.id });
        return Author.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        //  return books;
        return Book.find({});
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        //  return authors;
        return Author.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        return book.save();
      },
    },
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save();
      },
    },
    
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
