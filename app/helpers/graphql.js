exports.timestampsFieldsResolvers = (withDeletedAt = false) => {
  return {
    createdAt: (parent) => {
      return parent.created_at;
    },
    updatedAt: (parent) => {
      return parent.updated_at;
    },
    ...!withDeletedAt ? {} : {
      deletedAt: (parent) => {
        return parent.deleted_at;
      }
    }
  };
};
