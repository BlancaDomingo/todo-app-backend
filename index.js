// npm init -y
// npm install express
// npm install nodemon
// npm install cors
// npm install morgan
// npm install mongoose
// npm install dotenv
// npm install bcrypt
// npm install jsonwebtoken

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectMongoose } from './database-mongoose.js';
import 'dotenv/config';
import { auth } from './src/middleware/auth.middleware.js';

import usersRoutes from './src/routes/users.routes.js';
import todosRoutes from './src/routes/todos.routes.js';

const app = express();
const PORT = process.env.PORT || 4000;
const URI = process.env.URI_DB;

await connectMongoose(URI);


const corsOptions = {
    'Access-Control-Allow-Origin': `https://todo-list-blanca.herokuapp.com/`,
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(cors(corsOptions));

app.use(express.json());

app.use(auth());  // prüft token

app.use('/todos', todosRoutes);
app.use('/users', usersRoutes);


app.use(function (err, req, res, next) {
    console.error(err.stack);
    console.log(err);
    res.status(500).json({
        error: err.name,
        error: err.message,
    })
});


// Server start
app.listen(PORT, () => {
    console.log('Server is running http://localhost:' + PORT);
});
