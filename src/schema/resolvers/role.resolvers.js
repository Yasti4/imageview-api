'use strict';

const Role = require('./../../models/role');

module.exports = {
    role: async(parent, args, context, info) => {
        if (args.name) {
            const role = await Role.where('name', args.name).first();
            return role ? role.toJSON() : null;
        } else {
            return null;
        }
    },
    roles: async(parent, args, context, info) => {
        return (await Role.get()).toJSON();
    },
    createRole: async(rootValue, { name }) => {
        const params = { 'name': name };
        let result = null;
        const role = await (new Role).save(params)
            .then(data => {
                result = data.attributes;
            })
            .catch(err => {
                result = err;
            });
        return result;
    },
    updateRole: async(rootValue, { oldName, newName }) => {
        const role = await Role.where('name', oldName).first();
        if (!role) {
            return null;
        }
        role.set('name', newName);
        role.save();
        return role.toJSON();
        // let result = null;
        // const params = { 'name': newName };
        // console.log(role);
        // result = await role
        //     .save(params, {
        //         update: true,
        //         debug: true,
        //         patch: true
        //     });

        // return result;
    },
};