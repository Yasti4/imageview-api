exports.softDelete = (softDelete) => !(softDelete === undefined ? true : softDelete);

exports.pagination = (page = 1, limit = 10) => ({
  offset: (page - 1) * limit,
  limit: limit
});

exports.orderBy = (field = 'updatedAt', order = 'DESC') => ({
  order: [[field, order]]
});
