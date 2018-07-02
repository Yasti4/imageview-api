'use strict';

module.exports = {
  Album: {
    posts: (parent, args, context) => {
      return context.db('posts').all('album_id', parent.id);
    },
    subscribers: (parent, args, context) => {
      // return context.db('albums').where('id', parent.id)
      //   .subscribers().join().all();
      return parent.getSubscribers({
        attributes: context.db.User.onlyAttributes(info)
      });
    },
    likes: (parent, args, context, info) => {
      return parent.countLikes();
    }
  }
};
