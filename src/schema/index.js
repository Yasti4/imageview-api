'use strict';

const {
    GraphQLSchema,
    GraphQLObjectType
} = require('graphql');

const {
    UserQueries,
    AlbumQueries,
    VisibilityQueries,
    PrivacityQueries,
    TagQueries,
    CommentQueries,
    ImageQueries,
    PostQueries,
    RoleQueries
} = require('./queries');

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
            privacities: PrivacityQueries.privacities,
            tag: TagQueries.tag,
            tags: TagQueries.tags,
            comment: CommentQueries.comment,
            comments: CommentQueries.comments,
            image: ImageQueries.image,
            images: ImageQueries.images,
            post: PostQueries.post,
            posts: PostQueries.posts,
            role: RoleQueries.role,
            roles: RoleQueries.roles,
        }
    })
});