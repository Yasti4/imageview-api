'use strict';

module.exports = {
    comment: (parent, args, context, info) => {
        if (args.id) {
            return context.db.Comment.find({ where: { 'id': args.id } });
        } else if (args.comment_id) {
            return context.db.Comment.find({ where: { 'comment_id': args.comment_id } });
        } else if (args.post_id) {
            return context.db.Comment.find({ where: { 'post_id': args.post_id } });
        } else if (args.user_id) {
            return context.db.Comment.find({ where: { 'user_id': args.user_id } });
        }
    },
    comments: (parent, args, context, info) => {
        return context.db.Comment.findAll();
    },
    post: (parent, args, context, info) => {
        return context.db.Post.find({ where: { 'id': args.id } });
    },
    user: (parent, args, context, info) => {
        return context.db.User.find({ where: { 'id': args.id } });
    }
};