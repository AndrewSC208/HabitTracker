import express      from 'express';
import authenticate from '../../middleware/authenticate';

import { ObjectId } from 'mongodb';
import { Dao } from '../../index';

const Todos = express.Router();
/*
 *  POST /todos
 */
Todos.post('', authenticate, (req, res) => {
    const newTodo = {
        text: req.body.text,
        _creator: req.user._id
    };

    Dao.Todo.create(newTodo)
        .then(result => res.send(result))
        .catch(error => res.send(404).send(error));
});
/*
 *  GET all /todos
 */
Todos.get('', authenticate, (req, res) => {
    Dao.Todo.find({
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

    Dao.Todo.findOne({
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

    Dao.Todo.findOneAndRemove({
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

    Dao.Todo.findOneAndUpdate({
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