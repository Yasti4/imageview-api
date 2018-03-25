'use strict';

module.exports = {
    createUser: (parent, args, context, info) => {
        args.input.image_id = 1;
        console.log(args);
        return context.db.User.create(args.input);
    },
    updateUser: (parent, args, context, info) => {
        console.log(args);
        return context.db.User.update(
            args.input, { where: { username: args.username } }
        )
    }
};