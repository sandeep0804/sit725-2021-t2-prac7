let express = require("express");
let app = express();
let dbConnect = require("./dbConnect");

//dbConnect.dbConnect()
//var app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);
//const MongoClient = require('mongodb').MongoClient;

// routes
let projectsRoute = require('./routes/projects')


var port = process.env.PORT || 5050;
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use('/api/projects', projectsRoute)


app.get("/test", function (request, response) {
    var user_name = request.query.user_name;
    response.end("Hello " + user_name + "!");
});

app.get('/addTwoNumbers/:firstNumber/:secondNumber', function (req, res, next) {
    var firstNumber = parseInt(req.params.firstNumber)
    var secondNumber = parseInt(req.params.secondNumber)
    var result = firstNumber + secondNumber || null
    if (result == null) {
        res.json({ result: result, statusCode: 400 }).status(400)
    }
    else { res.json({ result: result, statusCode: 200 }).status(200) }
})

//socket test
io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    setInterval(() => {
        socket.emit('number', parseInt(Math.random() * 10));
    }, 1000);

});


http.listen(port, () => {
    console.log("Listening on port ", port);
});

