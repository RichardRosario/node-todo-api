const expect = require('expect');
const request = require('supertest');

const { app } = require('../server');
const {Todo} = require('./../../models/todo');

// beforeEach((done) => {
//     Todo.remove({}).then(() => {
//         done();
//     });
// });

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test to do text';

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            Todo.find().then((todos) => {
                expect(todos.length).toBe(todos.length);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((err) => done(err));
        })
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(res.body.todos.length);
        })
        .end(done);
    })
}); 

describe('GET /todos/:id', () => {
    //var todos = params.todo.text;

    it('should get a todo', (done) => {
        request(app)
        .get(`/todos/${todos[0]._id}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    })
    it('should return 404 if todo not found', (done) => {
        var hexId = new ObjectID(123).toHexString();
        request(app)
        .get(`todos/${hexId}`)
        .expect(404)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos.text)
        }).end(done)
    })
});