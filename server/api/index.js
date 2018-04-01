 /**
  * Setup
  * factory function to create the api object
  */
export const setup = (express, routes) => {
    const Api = express.Router();

    Api.use('/users', routes.Users);
    Api.use('/todos', routes.Todos);
    Api.use('/workouts', routes.Workouts);

    return Api;
};

