'use strict';

module.exports = {
    visibility: async(parent, args, context, info) => {
        if (args.name) {
            return context.db.Visibility.find({ where: { 'name': args.name } });
        }
    },
    visibilities: async(parent, args, context, info) => {
        return context.db.Visibility.findAll();
    },
    createVisibility: async(rootValue, { name }) => {
        const params = { 'name': name };
        let result = null;
        const visibility = await (new Visibility).save(params, {
                insert: true
            })
            .then(data => {
                result = data.attributes;
            })
            .catch(err => {
                result = err;
            });
        return result;
    },
    deleteVisibility: async(rootValue, { name }) => {
        const visibility = await Visibility.where('name', name).first();
        console.log(visibility);
        if (!visibility) {
            return null;
        }
        const params = { 'name': name };
        let result = null;
        await visibility.destroy(params, { //TODO
                delete: true
            })
            .then(data => {
                result = data.attributes;
            })
            .catch(err => {
                result = err;
            });
        return result;
    },
};