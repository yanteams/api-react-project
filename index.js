const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const UserModel = require('./models/userModel');
const UserController = require('./controllers/userController');

const models = {
    User: UserModel,
};

const controllers = {
    UserController: new UserController(models),
};

const userRoutes = require('./routes/userRoutes');
userRoutes(app, controllers);