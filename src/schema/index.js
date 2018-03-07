'use strict';

const {
    GraphQLSchema,
    GraphQLObjectType
} = require('graphql');
const UserQueries = require('./queries/user.queries');
const AlbumQueries = require('./queries/album.queries');
const VisibilityQueries = require('./queries/visibility.queries');
const PrivacityQueries = require('./queries/privacity.queries');

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            user: UserQueries.user,
            users: UserQueries.users,
            album: AlbumQueries.album,
            albums: AlbumQueries.albums,
            visibility: VisibilityQueries.visibility,
            visibilities: VisibilityQueries.visibilities,
            privacity: PrivacityQueries.privacity,
            privacities: PrivacityQueries.privacities
        }
    })
});