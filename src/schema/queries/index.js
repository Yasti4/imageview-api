'use strict';

const UserQueries = require('./user.queries');
const AlbumQueries = require('./album.queries');
const VisibilityQueries = require('./visibility.queries');
const PrivacityQueries = require('./privacity.queries');
const TagQueries = require('./tag.queries');
const CommentQueries = require('./comment.queries');
const ImageQueries = require('./image.queries');
const PostQueries = require('./post.queries');
const RoleQueries = require('./role.queries');

module.exports = {
    UserQueries,
    AlbumQueries,
    VisibilityQueries,
    PrivacityQueries,
    TagQueries,
    CommentQueries,
    ImageQueries,
    PostQueries,
    RoleQueries
};