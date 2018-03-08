'use strict';

const {
    GraphQLSchema,
    GraphQLObjectType
} = require('graphql');
const UserQueries = require('./queries/user.queries');
const AlbumQueries = require('./queries/album.queries');
const VisibilityQueries = require('./queries/visibility.queries');
const PrivacityQueries = require('./queries/privacity.queries');
const TagQueries = require('./queries/tag.queries');
const CommentQueries = require('./queries/comment.queries');
const ImageQueries = require('./queries/image.queries');
const PostQueries = require('./queries/post.queries');
const RoleQueries = require('./queries/role.queries');


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