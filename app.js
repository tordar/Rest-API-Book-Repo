const express = require('express');
const app = express();
const DBConnection = require('./config/db')
const handlebars = require('express-handlebars');
app.set('view engine', 'hbs');
app.engine('hbs', handlebars({ 
    layoutsDir: __dirname + '/views/layouts', 
    extname: '.hbs',
    partialsDir: __dirname + '/views/partials/'}));    
app.use(express.static('public'));
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config({ path: './config/config.env' })
const passport = require('passport')
const port = process.env.PORT || 3000;


// Passport middleware
app.use(passport.initialize())
app.use(passport.session())


app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });


//Import Routes
const postsRoute = require('./routes/posts');
const dashboard = require('./routes/dashboard');

// Connecting to DB
DBConnection()

// Middlewares: function that executes when a specific route is hit
app.use('/posts', postsRoute);
app.use('/dashboard', dashboard);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//Import Routes
app.get('/posts', postsRoute);
app.post('/posts', postsRoute)
app.put('/posts/:postId', postsRoute)
app.delete('/posts/:postId', postsRoute)

app.get('/', dashboard);


app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}, in ${process.env.NODE_ENV} mode`)
});


