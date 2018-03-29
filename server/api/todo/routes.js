import express from 'express';
import { ObjectId } from 'mongodb';

import Todo from './model';
import authenticate from '../../middleware/authenticate';

const Todos = express.Router();
/*
 *  POST /todos
 */
Todos.post('', authenticate, (req, res) => {
    // new up the model
    const todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    // call promise to save, when save is complete then send a res to the client
    todo.save().then((data) => {
        res.send(data);
    }, (e) => {
        res.status(400).send(e);
    });

    /**
     * Promise
     * 
     * Dao.Todos.create(data)
     * Is a promise, that retuns the object that should be sent back to the client,
     * or and error that contains the http status, and the error message
     */
    // Dao.Todos.create(data)
    //     .then(sucess => res.send(sucess))
    //     .catch(error => res.status(error.status).send(error.message));

    // OR

    /**
     * async/await
     * 
     * Dao.Todos.create(data)
     * 
     * Can somehow use async/await and try/catch?
     * Is it worth it?
     * Will the system be faster?
     * What about the developer experiance?
     * I would learn a bit more about conncurrency with JS.
     * I think that I might have some performance implecations.
     */
    // const success = await Dao.Todos.create(data);

    // try {
    //     res.send(success);
    // } catch(error) {
    //     res.status(error.status).send(error.message)
    // }

    // OR

    /**
     * USE MONGOOSE
     * Using mongoose gives me a lot of features right out of the box. 
     * I will be able to create statics for each model and these can be used app wide. 
     * Also meaning that I would not even need to have seperate restful api's.
     * I could just rely on GraphQL to do all my request handling. 
     * Might not be a bad choice since I need to move fast.
     * I would like to have the api's, and backend done in one sprint. 
     */
});
/*
 *  GET all /todos
 */
Todos.get('', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((data) => {
        res.send({
            data
        });
    }, (e) => {
        res.status(400).send(e);
    })
});
/*
 *  GET /todos/:id
 */
Todos.get('/:id', authenticate, (req, res) => {
    // id from route:
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(404).send({
            error_code: 404,
            error_msg: 'Id is not valid'
        });
    };

    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            res.status(404).send({
                error_code: 404,
                error_msg: 'Todo not found'
            });
        }

        res.send({ todo });
    }).catch((e) => {
        res.status(400).send({
            error_code: 404,
            error_msg: 'Todo service is down'
        });
    });
});
/*
 *  DELETE /todos/:id
 */
Todos.delete('/:id', authenticate, (req, res) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        res.status(404).send({
            error_code: 404,
            error_msg: 'Id is not valid'
        });
    };

    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            res.status(404).send({
                error_code: 404,
                error_msg: 'Todo was not found'
            });
        }

        res.send({
            status: 'removed',
            todo
        });
    }).catch((e) => {
        res.status(400).send({
            error_code: 400,
            error_msg: 'Todo service is down'
        });
    });
});
/*
 *  UPDATE /Todos/:id
 */
Todos.patch('/:id', authenticate, (req, res) => {
    const { id } = req.params;
    const body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectId.isValid(id)) {
        res.status(404).send({
            error_code: 404,
            error_msg: 'Id is not valid'
        });
    };

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({
        _id: id,
        _creator: req.user._id
    }, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            res.status(404).send({
                error_code: 404,
                error_msg: 'Could not update todo'
            });
        }

        res.status(200).send({ todo });
    }).catch((e) => {
        res.status(400).send({
            error_code: 400,
            error_msg: 'Todo service is down'
        });
    });
});

export default Todos;