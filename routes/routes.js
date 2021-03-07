// import other routes
const userRoutes = require('./investigations');

const appRouter = (app, fs) => {

    // default route
    app.get('/', (req, res) => {
        res.send('jsau api-server: pour avoir la liste des enquetes faut aller sur http://localhost:3000/investigations/');
    });

    // // other routes
    userRoutes(app, fs);

};

module.exports = appRouter;
