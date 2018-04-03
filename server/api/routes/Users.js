import _ from 'lodash';
import express from 'express';
import authenticate from '../../middleware/authenticate';

import { Dao } from '../../';

const Users = express.Router();
/*
 *  POST /users {username, email, password}
 *      -> THIS WILL CREATE A NEW USER AND RETURN A TOKEN FOR AUTHENTICATED ROUTES
 */
Users.post('', (req, res) => {
    const body = _.pick(req.body, ['username', 'email', 'password'])
    const user = new Dao.User(body);

    user.save().then(() => {
        return user.generateAuthTokens();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(404).send({
            error_msg: 'Faild to create user',
            error_code: 404
        });
    });

    /**
    Dao.user.create(body)
        .then()
        .then()
        .catch()

    Dao.user.create()
        .then()
        .catch()

    */
});
/*
 *  I NEED TO FIGURE OUT WHEN I AM GOING TO USE THIS ROUTE
 *      POST /users/me
 */
Users.post('/me', authenticate, (req, res) => {
    res.send(req.user);
});
/*
 *  POST /users/login {email, password}
 *      -> THIS WILL AUTHENTICATE A USER
 *      @return
 *          SUCCESS: (200) header: x-auth=jwt
 */
Users.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    Dao.User.findByCredentials(email, password)
        .then((user) => {
            return user.generateAuthTokens()
                .then((token) => {
                    res.header('x-auth', token).send(user);
                });
        }).catch(e => res.status(400).send(e));
});
/*
 *  REMOVE USER TOKEN
 */
Users.delete('/me/token', authenticate, (req, res) => {
    const { token } = req;

    req.user.removeToken(token).then(() => {
        res.status(200).send();
    }, (e) => {
        res.status(400).send();
    })
});

export default Users;