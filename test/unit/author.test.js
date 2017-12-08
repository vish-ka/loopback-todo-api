const { app, expect } = require('../common')

const Author = app.models.Author
const Todo = app.models.Todo

describe('Author', function() {

  describe('Hooks', function() {

    it('should not allow deleting an author with todos', function() {
      return Promise.resolve()
        .then(() => Author.create({ name: 'my Author' }))
        .then(cat => Todo.create({ title: 'Author-Todo', completed:false, authorId: cat.id }))
        .then(res => Author.destroyById(res.authorId))
        .then(res => expect(res).to.equal(null))
        .catch(err => expect(err).to.equal('Error deleting author with todos'))
    })

  })

})
