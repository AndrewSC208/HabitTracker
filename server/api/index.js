import express from 'express';

import Users from './user';
import Todos from './todo';
import Workouts from './workout';

const Api = express.Router();

Api.use('/users', Users);
Api.use('/todos', Todos);
// TODO: workouts still needs some love
//Api.use('/workouts', Workouts);

export default Api;