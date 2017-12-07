'use strict';

module.exports = function(Author) {

  Author.observe('before delete', function(ctx){
    return Author.app.models.Todo
      .count({ authorId: ctx.where.id })
      .then(res => {
        if (res > 0) {
          return Promise.reject('Error deleting author with todos')
        }
      })
  })
};
