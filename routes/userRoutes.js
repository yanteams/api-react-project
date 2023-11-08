const userRoutes = (app, controllers) => {
    app.post('/register', controllers.UserController.createUser.bind(controllers.UserController));
    app.post('/login', controllers.UserController.loginUser.bind(controllers.UserController));
};

module.exports = userRoutes;