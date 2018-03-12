'use strict';

const Visibility = require('./../../models/visibility');

module.exports = {
    visibility: async(parent, args, context, info) => {
        if (args.name) {
            const visibility = await Visibility.where('name', args.name).first();
            return visibility ? visibility.toJSON() : null;
        } else {
            return null;
        }
    },
    visibilities: async(parent, args, context, info) => {
        return (await Visibility.get()).toJSON();
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
        await visibility.destroy(params, {
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