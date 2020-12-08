const userRoutes = require('./users');

const appRouter = (app) => {

    // default route
    app.get('/', (req, res) => {
        res.send('welcome to Node microservice');
    });

    // User routes
    userRoutes(app);

};

module.exports = appRouter;
