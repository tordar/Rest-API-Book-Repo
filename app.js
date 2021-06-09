const express = require('express');
const app = express();
const DBConnection = require('./config/db')
const handlebars = require('express-handlebars');
app.set('view engine', 'hbs');   
app.use(express.static('public'));
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config({ path: './config/config.env' })
const passport = require('passport')
const port = process.env.PORT || 3000;

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Import Routes
const postsRoute = require('./routes/posts');
const dashboard = require('./routes/dashboard');
const auth = require('./routes/auth')

// Connecting to DB
DBConnection()

// Middlewares: function that executes when a specific route is hit
app.use('/posts', postsRoute);
app.use('/dashboard', dashboard);
app.use('/auth/google', auth);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//Import Routes
app.get('/posts', postsRoute);
app.post('/posts', postsRoute)
app.put('/posts/:postId', postsRoute)
app.delete('/posts/:postId', postsRoute)

//Dashboard route
app.get('/', dashboard);

//Authentication route
app.get('/auth/google', auth);


app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}, in ${process.env.NODE_ENV} mode`)
});
