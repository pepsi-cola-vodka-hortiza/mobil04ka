module.exports = {
  Note: {
    author: async (note, args, { models }) => {
      return models.User.findById(note.author);
    },
    favoritedBy: async (note, args, { models }) => {
      return models.User.find({ _id: { $in: note.favoritedBy } });
    },
    comments: (note, args, { models }) => {
      return note.comments.map(async (comment) => {
        const author = await models.User.findById(comment.author);
        return {
          id: comment._id,
          text: comment.text,
          author,
        };
      });
    },
  },
};
