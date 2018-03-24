'use strict';

module.exports = {
    user: (parent, args, context, info) => {
        if (args.id) {
            return context.db.User.find({ where: { 'id': args.id } });
        } else if (args.username) {
            return context.db.User.find({ where: { 'username': args.username } });
        }
    },
    users: (parent, args, context, info) => {
        return context.db.User.findAll();
    },
    image: (parent, args, context, info) => {
        return context.db.Image.find({ where: { 'id': args.id } });
    },
    role: async(parent, args, context, info) => {
        return context.db.Role.find({ where: { 'name': args.name } });
    },
    createUser: async(rootValue, { input }) => {
        input.image_id = 1; //TODO quitar implementar el id de la imagen subida
        try {
            const user = await User.create(input);
            return user.toJSON();
        } catch (error) {
            throw error;
        }
    },
    updateUser: async(rootValue, { username, input }) => {
        const user = await User.where('username', username).first();
        if (!user) {
            return null;
        }
        for (const key in input) {
            if (input.hasOwnProperty(key)) {
                user.set(key, input[key])
            }
        }
        user.save();
        return user.toJSON();
    },
    following: async(rootValue, { input }) => {
        return false;
        // const foundUser = await User
        //     .where('id', input.user_followed)
        //     .with('following')
        //     .where('user_followed', input.user_followed)
        //     .orWhere('user_follower', input.user_follower)
        //     .first();
        // if (foundUser) {
        //     console.log('found');
        //     for (const key in input) {
        //         if (input.hasOwnProperty(key)) {
        //             user.set(key, input[key])
        //         }
        //     }
        //     user.save();
        //     return user.toJSON();
        // }
        // console.log('not found');
        // const user = await User.with('following').create(input);
        // if (!user) {
        //     return null;
        // }

        // return user.toJSON();
    },
};