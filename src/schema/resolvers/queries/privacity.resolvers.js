'use strict';

module.exports = {
    privacity: async(parent, args, context, info) => {
        if (args.id) {
            return context.db.Privacity.find({ where: { 'id': args.id } });
        } else if (args.user_id) {
            return context.db.Privacity.find({ where: { 'user_id': args.user_id } });
        }
    },
    privacities: async(parent, args, context, info) => {
        console.log(context);
        return context.db.Privacity.findAll();
    },
    user: async(parent, args, context, info) => {
        return context.db.User.find({ where: { 'id': args.id } });
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