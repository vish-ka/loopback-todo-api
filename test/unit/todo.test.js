const { app, expect } = require('../common')

const Todo = app.models.Todo

describe('Validation', function() {

  it('should reject a title < 5 chars', function() {
    return Todo.create({ title: 'a', completed: false, authorId: 1 })
      .then(res => Promise.reject('Todo should not be created'))
      .catch(err => {
        expect(err.message).to.contain('title should be at least 5 characters')
        expect(err.statusCode).to.be.equal(422)
      })
  })

  it('should reject a duplicate title', function() {
    return Promise.resolve()
      .then(() => Todo.create({ title: 'poiuy', completed: false, authorId: 1 }))
      .then(() => Todo.create({ title: 'poiuy', completed: false, authorId: 1 }))
      .then(res => Promise.reject('Todo should not be created'))
      .catch(err => {
        expect(err.message).to.contain('Details: `title` is not unique')
        expect(err.statusCode).to.be.equal(422)
      })
  })

  it('should store a correct Todo', function() {
    return Todo.create({ title: 'all good', completed: false, authorId: 1 })
      .then(res => {
        expect(res.title).to.equal('all good')
        expect(res.completed).to.be.equal(false)
        expect(res.authorId).to.be.equal(1)
      })
  })

})

describe('Hooks', function() {

  it('should not allow adding a todo to non-existing author', function() {
    return Todo.create({ title: 'clicking', completed: false, authorId: 9999 })
      .then(res => expect(res).to.equal(null))
      .catch(err => expect(err).to.equal('Error adding todo to non-existing author'))
  })

})
