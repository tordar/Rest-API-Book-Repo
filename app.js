const express = require('express');
const app = express();
const DBConnection = require('./config/db')
const handlebars = require('express-handlebars');
app.set('view engine', 'hbs');
app.engine('hbs', handlebars({ 
    layoutsDir: __dirname + '/views/layouts', 
    extname: '.hbs',
    defaultLayout: 'planB',
    partialsDir: __dirname + '/views/partials/'}));    
app.use(express.static('public'));
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config({ path: './config/config.env' })
const port = process.env.PORT || 3000;

fakeApi = () => {
    return [
      {
        name: 'Katarina',
        lane: 'midlaner'
      },
      {
        name: 'Jayce',
        lane: 'toplaner'
      },
      {
        name: 'Heimerdinger',
        lane: 'toplaner'
      },
      {
        name: 'Zed',
        lane: 'midlaner'
      },
      {
        name: 'Azir',
        lane: 'midlaner'
      }
    ];
  }
  

  app.get('/', (req, res) => {
    res.render('main', {layout: 'index', suggestedChamps: fakeApi(), listExists: true});
    });
    
//Import Routes
const postsRoute = require('./routes/posts');

// Connecting to DB
DBConnection()

// Middlewares: function that executes when a specific route is hit
app.use('/posts', postsRoute);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


//Import Routes
app.get('/posts', postsRoute);
app.post('/posts', postsRoute)
app.put('/posts/:postId', postsRoute)
app.delete('/posts/:postId', postsRoute)


app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}, in ${process.env.NODE_ENV} mode`)
});


