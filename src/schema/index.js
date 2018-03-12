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

const RoleMutation = require('./mutations/role.mutations');
const VisibilityMutation = require('./mutations/visibility.mutations');

const UserMutation = require('./mutations/user.mutations');

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
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            createRole: RoleMutation.createRole,
            updateRole: RoleMutation.updateRole,
            createVisibility: VisibilityMutation.createVisibility,
            deleteVisibility: VisibilityMutation.deleteVisibility,
            updateUser: UserMutation.updateUser,
        }
    })
});