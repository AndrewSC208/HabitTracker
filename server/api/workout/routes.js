import express from 'express';
import { ObjectId } from 'mongodb';

import Workout from './model';
import authenticate from '../../middleware/authenticate';

const Workouts = express.Router();

/**
 * POST /workouts
 * Action: Create a workout for the user with fk of userId
 * @param { workoutType: '', userId: 'string'}
 */
Workouts.post('', authenticate, (req, res) => {
    const { start_time, end_time, workoutType, userId} = req.body;
    const workout = new Workout({
        workoutType,
        userId
    });

    if (!ObjectId.isValid(userId)) {
        return res.status(404).send({
            error_code: 404,
            error_msg: 'User ID is not valid'
        });
    };

    workout.save().then((workout) => {
        res.send(workout);
    }, (e) => {
        res.status(400).send(e);
    });
});
/*
 *  Get all workouts for a user:
 *  GET /worksouts
 *  
 */
// Worksouts.get('/', (req, res) => {

// });

export default Workouts;