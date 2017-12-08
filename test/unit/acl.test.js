const { app, expect, request } = require('../common')


describe('ACL', function() {

  describe('Author', function() {

    it('should return 200 when listing Authors', function() {
      return request
        .get('/api/Authors')
        .expect(200);
    });

    it('should return 401 when creating Authors', function() {
      return request
        .post('/api/Authors')
        .send({ name: "My Author" })
        .expect(401)
    });

    it('should return 401 when updating Authors', function() {
      return request
        .patch('/api/Authors/1')
        .send({ name: "My Author" })
        .expect(401);
    });

    it('should return 401 when deleting Authors', function() {
      return request
        .delete('/api/Authors/1')
        .expect(401);
    });

  })

  describe('Todo', function() {

    it('should return 200 when listing Todos', function() {
      return request
        .get('/api/Todos')
        .expect(200);
    });

    it('should return 401 when creating a Todo', function() {
      return request
        .post('/api/Todos')
        .send({ name: 'My Todo', completed:false, authorId:2 })
        .expect(401)
    });

    it('should return 401 when deleting a Todo', function() {
      return request
        .delete('/api/Todos/1')
        .expect(401)
    });

    it('should return 401 when updating a Todo', function() {
      return request
        .patch('/api/Todos/1')
        .expect(401)
    });
  });


})
