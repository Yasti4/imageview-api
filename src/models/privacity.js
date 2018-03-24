'use strict';

module.exports = function(sequelize, DataTypes) {
    var Privacity = sequelize.define('Privacity', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER
        },
        search: {
            type: DataTypes.STRING
        },
        posts: {
            type: DataTypes.STRING
        },
        albums: {
            type: DataTypes.STRING
        },
    }, {
        tableName: 'privacity'
    });

    //TODO hacer relaciones
    return Privacity;
};