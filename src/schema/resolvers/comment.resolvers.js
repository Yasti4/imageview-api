'use strict';


const {
    Comment,
    Post,
    User
} = require('./../../models');

module.exports = {
    comment: async(parent, args, context, info) => {
        if (args.id) {
            const comment = await Comment.where('id', args.id).first();
            return comment ? comment.toJSON() : null;
        } else if (args.comment_id) {
            const comment = await Comment.where('comment_id', args.comment_id).first();
            return comment ? comment.toJSON() : null;
        } else if (args.post_id) {
            const comment = await Comment.where('post_id', args.post_id).first();
            return comment ? comment.toJSON() : null;
        } else if (args.user_id) {
            const comment = await Comment.where('user_id', args.user_id).first();
            return comment ? comment.toJSON() : null;
        } else {
            return null;
        }
    },
    comments: async(parent, args, context, info) => {
        return (await Comment.get()).toJSON();
    },
    post: async(parent, args, context, info) => {
        return (await Post.where('id', args.id).first()).toJSON();
    },
    user: async(parent, args, context, info) => {
        return (await User.where('id', args.id).first()).toJSON();
    }
};