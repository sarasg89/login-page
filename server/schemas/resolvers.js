const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);
const resolvers = {
  Query: {
    // get the current logged in user data, include their orders and saved products
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);

      if (!user) {
        throw new AuthenticationError("Something is wrong!");
      }

      const token = signToken(user);

      return { token, user };
    },

    // user update
    updateUser: async (parent, args, context) => {
      if (context.user) {
        let updatedUser = {};
        if (args.firstName && args.firstName.length > 0) {
          updatedUser.firstName = args.firstName;
        }
        if (args.lastName && args.lastName.length > 0) {
          updatedUser.lastName = args.lastName;
        }

        // checking if both email and password are provided to indicate an email change
        if (args.email && args.email.length > 0) {
          if (!args.password || args.password.length < 1) {
            throw new AuthenticationError(
              "Please provide your current password"
            );
          }
          const user = await User.findById(context.user._id);
          const correctPw = await user.isCorrectPassword(args.password);
          if (!correctPw) {
            throw new AuthenticationError("Incorrect credentials");
          }
          updatedUser.email = args.email;
          return User.findByIdAndUpdate(context.user._id, updatedUser, {
            new: true,
          });
        }

        //checking if both current password and new password are provided to indicate a password change
        if (
          args.password &&
          args.password.length > 0 &&
          args.currentPassword &&
          args.currentPassword.length > 0
        ) {
          const user = await User.findById(context.user._id);
          const correctPw = await user.isCorrectPassword(args.currentPassword);
          if (!correctPw) {
            throw new AuthenticationError("Incorrect credentials");
          }
          updatedUser.password = await user.hashPassword(args.password);
        }

        return User.findByIdAndUpdate(context.user._id, updatedUser, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },
    // delete you account
    deleteUser: async (parent, args, context) => {
      if (context.user) {
        if (args.password && args.password.length > 0) {
          const user = await User.findById(context.user._id);
          const correctPw = await user.isCorrectPassword(args.password);
          if (!correctPw) {
            throw new AuthenticationError("Incorrect credentials");
          }
          await User.findByIdAndDelete(context.user._id);
          return { message: "Your account has been deleted!" };
        }
      }
    },
    // login
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
