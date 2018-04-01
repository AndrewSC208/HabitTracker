import mongoose from 'mongoose';

export const create = (obj, Model) => {
    const model = new Model(obj);

    return new Promise((resolve, reject) => {
        model.save()
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject({
                    code: 400,
                    message: 'Failed to save'
                });
            })
    });
}

export const setup = (config, models) => {
    // mongoose setup:
    const MONGO_URI = config.DB.MONGOOSE_CONNECTION_STRING;
    if(!MONGO_URI) {
        throw new Error('A url must be provided for mongo');
    }

    mongoose.PromiseProvider = global.Promise;
    mongoose.connect(MONGO_URI);
    mongoose.connection
        .once('open', () => {
            console.log('MONGO CONNECTED')
            // maybe I could run a initialize script at this point to add some data to mongo
        })
        .on('error', error => console.log('ERROR CONNECTING TO MONGO'));

    // This is where I am going to assign static crud classes to all the models
    for(let model in models) {
        console.log('STATIC METHODS: ', model);

        if(model === 'Todo') {
            console.log('before: ', models[model].schema.statics)
            
            models[model].schema.statics.create = create;

            console.log('after: ', models[model].schema.statics)
        }
    }

    return models;
};