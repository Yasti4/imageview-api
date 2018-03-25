'use strict';

module.exports = {
    createRole: (parent, args, context, info) => {
        return context.db.Role.create(args);
    },
    updateRole: async(parent, args, context, info) => { // TODO
        const affectedRows = await context.db.Role.update(
            args.newName, { where: { user_id: args.oldName } });
        return !!affectedRows[0];
    }
};