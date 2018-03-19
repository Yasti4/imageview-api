'use strict';

const {
    Visibility,
    Privacity,
    User
} = require('./../../models');

module.exports = {
    privacity: async(parent, args, context, info) => {
        if (args.id) {
            const privacity = await Privacity.where('id', args.id).first();
            return privacity ? privacity.toJSON() : null;
        } else if (args.user_id) {
            const privacity = await Privacity.where('user_id', args.user_id).first();
            return privacity ? privacity.toJSON() : null;
        } else {
            return null;
        }
    },
    privacities: async(parent, args, context, info) => {
        return (await Privacity.get()).toJSON();
    },
    user: async(parent, args, context, info) => {
        return (await User.where('id', args.id).first()).toJSON();
    },
    createPrivacity: async(rootValue, { input }) => {
        const visibilities = (await Visibility.get()).toJSON();
        const params = {
            search: (
                (visibilities.find((data) => data['name'] == input.search) != undefined) &&
                input.search) || privacity.search,
            posts: (
                (visibilities.find((data) => data['name'] == input.posts) != undefined) &&
                input.posts) || privacity.posts,
            albums: (
                (visibilities.find((data) => data['name'] == input.albums) != undefined) &&
                input.albums) || privacity.albums
        }
        input.search = params.search;
        input.posts = params.posts;
        input.albums = params.albums;

        const privacity = await Privacity.create(input);
        return privacity.toJSON();
    },
    updatePrivacity: async(rootValue, { input }) => {
        const privacity = await Privacity.where('id', input.id).first();
        if (!privacity) {
            return null;
        }
        const visibilities = (await Visibility.get()).toJSON();
        const params = {
            search: (
                (visibilities.find((data) => data['name'] == input.search) != undefined) &&
                input.search) || privacity.search,
            posts: (
                (visibilities.find((data) => data['name'] == input.posts) != undefined) &&
                input.posts) || privacity.posts,
            albums: (
                (visibilities.find((data) => data['name'] == input.albums) != undefined) &&
                input.albums) || privacity.albums
        }
        privacity.save(params);
        return privacity.toJSON();
    },
};