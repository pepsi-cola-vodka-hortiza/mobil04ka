const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  AuthenticationError,
  ForbiddenError,
} = require("apollo-server-express");
require("dotenv").config();

module.exports = {
  Mutation: {
    signUp: async (parent, { username, email, password }, { models }) => {
      email = email.trim().toLowerCase();
      const hashed = await bcrypt.hash(password, 10);
      try {
        const user = await models.User.create({
          username,
          email,
          password: hashed,
        });
        return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      } catch (error) {
        throw new Error("Error creating account!");
      }
    },

    signIn: async (parent, { username, email, password }, { models }) => {
      if (email) {
        email = email.trim().toLowerCase();
      }
      const user = await models.User.findOne({
        $or: [{ email }, { username }],
      });

      if (!user) {
        throw new AuthenticationError("Error signing in");
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new AuthenticationError("Error signing in");
      }
      return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    },

    createNote: async (parent, args, { models, user }) => {
      if (!user) {
        new AuthenticationError("You must be signed in to create a note");
      }
      let newNote = {
        content: args.content,
        author: mongoose.Types.ObjectId(user.id),
      };
      return models.Note.create(newNote);
    },

    updateNote: async (parent, { id, content }, { models, user }) => {
      if (!user) {
        new AuthenticationError("You must be signed in to update a note");
      }
      const note = await models.Note.findById(id);

      if (note && String(note.author) !== user.id) {
        throw new ForbiddenError("You dont have permission to update note");
      }
      try {
        await models.Note.findOneAndUpdate(
          { _id: id },
          { $set: { content } },
          { new: true }
        );
        return true;
      } catch (err) {
        return false;
      }
    },

    deleteNote: async (parent, { id }, { models, user }) => {
      if (!user) {
        new AuthenticationError("You must be signed in to create a note");
      }
      const note = await models.Note.findById(id);

      if (note && String(note.author) !== user.id) {
        new ForbiddenError("You dont have permission to delete note");
      }
      try {
        await note.remove();
        return true;
      } catch (err) {
        return false;
      }
    },

    toggleFavorite: async (parent, { id }, { models, user }) => {
      if (!user) {
        new AuthenticationError("You must be signed in to create a note");
      }
      const note = await models.Note.findById(id);
      const hasUser = note.favoritedBy.indexOf(user.id);

      if (hasUser >= 0) {
        return models.Note.findByIdAndUpdate(
          id,
          {
            $pull: {
              favoritedBy: mongoose.Types.ObjectId(user.id),
            },
            $inc: {
              favoriteCount: -1,
            },
          },
          {
            new: true,
          }
        );
      } else {
        return models.Note.findByIdAndUpdate(
          id,
          {
            $push: {
              favoritedBy: mongoose.Types.ObjectId(user.id),
            },
            $inc: {
              favoriteCount: 1,
            },
          },
          {
            new: true,
          }
        );
      }
    },

    addComment: async (parent, { id, text }, { models, user }) => {
      if (!user) {
        new AuthenticationError("You must be signed in to add comment");
      }

      return models.Note.findByIdAndUpdate(
        id,
        {
          $push: {
            comments: {
              author: mongoose.Types.ObjectId(user.id),
              text,
            },
          },
        },
        {
          new: true,
        }
      );
    },

    removeComment: async (parent, { noteId, commentId }, { models, user }) => {
      const note = await models.Note.findById(noteId);
      const comment = note.comments.find((element) => element.id === commentId);

      if (!user) {
        throw new AuthenticationError(
          "You must be signed in to remove comment"
        );
      }

      if (comment && String(comment.author._id) !== user.id) {
        throw new ForbiddenError("You dont have permission to delete comment");
      }

      return models.Note.findByIdAndUpdate(
        noteId,
        {
          $pull: { comments: { _id: mongoose.Types.ObjectId(commentId) } },
        },
        {
          new: true,
        }
      );
    },
  },
};
