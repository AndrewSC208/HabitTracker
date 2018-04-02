import mongoose from 'mongoose';

export const setup = (config, models) => {
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
            //console.log('JUST TO SEE STUFF IN MONGOOSE: ', models[model].schema)
        }
    }

    return models;
};