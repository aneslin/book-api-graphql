const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    //this is for debugging only
    users: async () => {
      return User.find().populate("Book");
    },
    //find me based on global context from log in
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).populate(
          "Book"
        );
        return userData;
      }
      throw new AuthenticationError("not logged in");
    },
  },

  Mutation: {
    //oops null books need to be deleted
    cleanBook: async (parent, { username }) => {
      const updatedUser = await User.findOneAndUpdate(
        { username: username },
        { $unset: { savedBooks: "" } },
        { new: true }
      );
    },
    createUser: async (parent, args ) => {
      console.log(args.username,args.email)
      const user = await User.create(args);
      console.log(user)
      const token = signToken(user);
      return { user, token };
    },

    //find a user based on email; check password and send token
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      //if username is wrong-being explicit for debugging
      if (!user) {
        throw new AuthenticationError("incorrect username");
      }
      //call pw compare method from user model
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("invalid password");
      }
      const token = signToken(user);
      return { user, token };
    },

    saveBook: async (
      parent,
      { authors, description, bookId, image, link, title },
      context
    ) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              savedBooks: {
                authors: authors,
                description: description,
                bookId: bookId,
                image: image,
                link: link,
                title: title,
              },
            },
          },
          { new: true, runValidators: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("you need to be logged in");
    },

    deleteBook: async (parent, { savedBookId }, context) => {
      console.log("==***===>", savedBookId);
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: savedBookId } } },
          { new: true }
        );

        return updatedUser;
      }
      throw new AuthenticationError("you need to be logged in");
    },
  },
};

module.exports = resolvers;
