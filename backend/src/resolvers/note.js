module.exports = {
  Note: {
    author: async (note, args, { models }) => {
      return models.User.findById(note.author);
    },
    favoritedBy: async (note, args, { models }) => {
      return models.User.find({ _id: { $in: note.favoritedBy } });
    },
    comments: async (note, args, { models }) => {
      const author = await models.User.findById(note.author);
      return note.comments.map((comment) => {
        return {
          id: comment._id,
          text: comment.text,
          author,
        };
      });
    },
  },
};
