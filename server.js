var express = require('express'),
    events = require('./routes/events.js'),
    model = require('./routes/model.js');

var app = express();

app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
    console.log(__dirname);
    app.use('/html/', express.static(__dirname + '/html', { maxAge: 0 }));
});


app.get('/events', events.findAll);
app.get('/events/:id', events.findById);
app.get('/events/role/:role', events.findByRole);
app.get('/model', model.findAll);
app.get('/model/:id', model.findById);
app.get('/model/role/:role', model.findByRole);
app.get('/model/last/CM', model.findLastCM);

app.listen(3000);
console.log('Listening on port 3000...');
