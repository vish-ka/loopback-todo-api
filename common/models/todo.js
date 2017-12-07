'use strict';

module.exports = function(Todo) {

  Todo.observe('before save', function(ctx, next) {
    if (ctx.instance && ctx.instance.authorId) {
      return Todo.app.models.Author
        .count({ id: ctx.instance.authorId })
        .then(res => {
          if (res < 1) {
            return Promise.reject('Error adding todo to non-existing author')
          }
        })
    }
    return next()
  });

  // Validate minimal length of the name
  Todo.validatesLengthOf('title', {
    min: 5,
    message: {
      min: 'title should be at least 5 characters',
    },
  });

  Todo.validatesUniquenessOf('title')

};
