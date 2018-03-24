'use strict';

module.exports = function(sequelize, DataTypes) {
    var Role = sequelize.define('Role', {
        name: {
            type: DataTypes.STRING,
            primaryKey: true,
        }
    }, {
        tableName: 'roles'
    });

    Role.associate = function(models) {
        Role.hasMany(models.User, {
            as: 'users',
            foreignKey: 'role',
            sourceKey: 'name'
        });
    }

    return Role;
};