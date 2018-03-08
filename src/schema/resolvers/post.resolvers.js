'use strict';


const {
    Post,
    User,
    Album
} = require('./../../models');

module.exports = {
    post: async(parent, args, context, info) => {
        if (args.id) {
            const post = await Post.where('id', args.id).first();
            return post ? post.toJSON() : null;
        } else if (args.user_id) {
            const post = await Post.where('user_id', args.user_id).first();
            return post ? post.toJSON() : null;
        } else if (args.album_id) {
            const post = await Post.where('album_id', args.album_id).first();
            return post ? post.toJSON() : null;
        } else if (args.enable_comments) {
            const post = await Post.where('enable_comments', args.enable_comments).first();
            return post ? post.toJSON() : null;
        } else {
            return null;
        }
    },
    posts: async(parent, args, context, info) => {
        return (await Post.get()).toJSON();
    },
    user: async(parent, args, context, info) => {
        return (await User.where('id', args.id).first()).toJSON();
    },
    album: async(parent, args, context, info) => {
        return (await Album.where('id', args.id).first()).toJSON();
    },
};