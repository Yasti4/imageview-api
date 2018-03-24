'use strict';

module.exports = {
    image: async(parent, args, context, info) => {
        if (args.id) {
            return context.db.Image.find({ where: { 'id': args.id } });
        }
    },
    images: async(parent, args, context, info) => {
        return context.db.Image.findAll();
    }
};