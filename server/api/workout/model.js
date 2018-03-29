import mongoose from 'mongoose';

const WorkoutSchema = new mongoose.Schema({
    workoutType: {
        type: String,
        required: true,
        minlength: 1,
    },
    userId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId
    }
});

const Workout = mongoose.model('Workout', WorkoutSchema);

export default Workout;

/*
{
    entered_time: Date.now(),
    workoutType: 'HITT',
    _creator: '548934hjkhfjsdf'
}
*/