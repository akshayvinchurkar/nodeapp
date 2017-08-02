var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

//view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var users = [
    {
        id: 1,    
        first_name: 'john',
        last_name: 'Doe',
        email: 'johndoe@gmail.com'
    },
    {
        id: 2,    
        first_name: 'akshay',
        last_name: 'mark',
        email: 'marker@gmail.com'
    },
    {
        id: 3,    
        first_name: 'pexel',
        last_name: 'jane',
        email: 'pexeljane@gmail.com'
    },
    {
        id: 4,    
        first_name: 'heren',
        last_name: '',
        email: 'johndoe@gmail.com'
    }
]

app.get('/', function(req, res) {
    res.render('index', {
        title: 'Customers',
        users: users
    });
});


app.listen(3000, function() {
    console.log('server is running on port 3000');
});