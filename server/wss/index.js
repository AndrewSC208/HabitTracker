import * as Actions from './actions';
import { Dao } from '../index';

export const setup = (WebSocket, server) => {
    const wss = new WebSocket.Server({server});

    wss.on('connection', (ws, req) => {
        // auth socket
        Actions.connection(ws, req);

        // wss.on('create_todo', (ws, todo) => {

        //     Dao.Todo.create(todo)
        //         .then(res => ws.send(res))
        //         .catch(err => ws.send(err))
        // });

        // ws.on('read_todo', (ws, query) => {
        //     Dao.Todo.find(query)
        //         .then(res => ws.send(res))
        //         .catch(err => ws.send(err))
        // });

        // ws.on('update_todo', (ws, query) => {
        //     Dao.Todo.findOneAndUpdate(query)
        //         .then(res => ws.send(res))
        //         .catch(err => ws.send(err))
        // });

        // ws.on('delete_todo', (ws, id) => {
        //     Dao.Todo.remove(id)
        //         .then(res => ws.send(res))
        //         .catch(err => ws.send(err))
        // });

        wss.on('message', (msg) => {
            Actions.message(msg);
        });

        wss.send('something');
    });

    return wss;
}

/**
 * sockets
 * 
 * What is my strategy for sockets. I am not sure yet, but I think that I am going to start by making an action for each model type.
 * CREATE_TODO
 *  Dao.Todo.create(todo)
 *      .then(res => ws.send(res))
 *      .catch(err => ws.send(err))
 * READ_TODO
 *  Dao.Todo.find(todo)
 *      .then(res => ws.send(res))
 *      .catch(err => ws.send(err))
 * UPDATE_TODO
 *  Dao.Todo.findOneAndUpdate(query, todo)
 *      .then(res => ws.send(res))
 *      .catch(err => ws.send(err))
 * DELETE_TODO
 *  Dao.Todo.remove(todo)
 *      .then(res => ws.send(res))
 *      .catch(err => ws.send(err))
 * 
 */