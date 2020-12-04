const userRoutes = require('./users');

const appRouter = (app, fs) => {

    // default route
    app.get('/', (req, res) => {
        res.send('welcome to Node microservice');
    });

    // User routes
    userRoutes(app, fs);

};

module.exports = appRouter;
