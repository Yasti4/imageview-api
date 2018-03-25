'use strict';

module.exports = {
    tag: (parent, args, context, info) => {
        if (args.id) {
            return context.db.Tag.find({ where: { 'id': args.id } });
        } else if (args.name) {
            return context.db.Tag.find({ where: { 'name': args.name } });
        }
    },
    tags: (parent, args, context, info) => {
        return context.db.Tag.findAll();
    },
    search: async(parent, args, context, info) => {
        const users = await context.db.User.findAll({
            where: {
                username: {
                    [context.db.Sequelize.Op.like]: `%${args.search}%`
                }
            }
        });
        const tags = await context.db.Tag.findAll({
            where: {
                name: {
                    [context.db.Sequelize.Op.like]: `%${args.search}%`
                }
            }
        });
        return [...users, ...tags];
    },
};