import mongoose from 'mongoose';

const name = 'Todo';

const mongooseType = {
    name,
    model: {
        text: {
            type: String,
            required: true,
            minLength: 1,
            trim: true
        },
        completed: {
            type: Boolean,
            default: false
        },
        completedAt: {
            type: Number,
            default: null
        },
        _creator: {
            required: true,
            type: mongoose.Schema.Types.ObjectId
        }
    }
}

/**
 * GRAPHQL IS DEF MORE WORK BUT I THINK THAT IT MIGHT BE WORTH IT.
 * IF I CAN FIND A WAY TO AUTOMATE RESTFUL API DEV, THEN IT REALLY 
 * WILL NOT TAKE ME TOO MUCH MORE TIME TO ADD. I KIND OF LIKE THE
 * EXTRA LAYER, BUT I DEF DON'T WANT TO MAINTAIN TWO MODEL
 */

export const TodoType = new GraphQLObjectType({
    name,
    fields: () => {
        _id: {type: GraphQLString},
        text: {type: GraphQLString},
        completed: {type: GraphQLBoolean},
        _creator: {type: GraphQLString},
        users: {
            // need to figure out the how to register resolvers
        }
    }
});

export const Todo = mongoose.model(mongooseType.name, mongooseType.model);
