// simple express node app that create records
// import all nessasary packages
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');

// called the app varibale to express
var app = express();

//view engine as ejs like templating engine ex. handlebars
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Express validator middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));


// dummy json data created for demo
var users = [{
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

// simple home route to see something on screen at root level
app.get('/', function(req, res) {
    res.render('index', {
        title: 'Customers',
        users: users
    });
});


// add route to add new customer
app.post('/users/add', function(req, res) {

    req.checkBody('first_name', 'Firstname is required').notEmpty();
    req.checkBody('last_name', 'lastname is required').notEmpty();
    req.checkBody('email', 'email is required').notEmpty();


    var errors = req.validationErrors();

    if (errors) {
        console.log('Errors');
    } else {
        var newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email
        }
    }
    console.log("success");

});

// little server running at port 3000
app.listen(3000, function() {
    console.log('server is running on port 3000'); //callback function that tells  you server is running
});