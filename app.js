const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.locals.pretty = true;

app.get('/form_receiver', (req, res) => {
    var title = req.query.title;
    var description = req.query.description;
    res.send(title + ", " + description);
});

app.post('/form_receiver', (req, res) => {
    var title = req.body.title;
    var description = req.body.description;
    res.send(title + ", " + description);
});
app.get('/form', (req, res) => {
    res.render('form');
});

app.get('/topic/:id', (req, res) => {
    var topics = [
        "JavaScript is ...",
        "Nodejs is ...",
        "Express is ..."
    ];

    var output = `
        <a href="/topic/0">JavaScript</a><br>
        <a href="/topic/1">Nodejs</a><br>
        <a href="/topic/2">Express</a><br><br>
        ${topics[req.params.id]}
    `;
    res.send(output);
});

app.get('/template', (req, res) => {
    res.render('temp', { time: Date(), title: "Jade" });
});

app.get('/', (req, res) => {
    res.send('Hello home page!');
});

app.get('/login', (req, res) => {
    res.send('<h1>Login please...</h1>');
});

app.get('/dynamic', (req, res) => {
    var lis = '';
    for(i = 0; i < 10; i++)
        lis += ('<li>coding ' + (i + 1) +'</li>');
    var time = Date();
    var output = `    
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8" />
        <title>Dynamic</title>
    </head>
    <body>
        Hello, dynamic!!!
        <ul>
            ${lis}
        </ul>
        ${time}
    </body>
    </html>
    `;
    res.send(output);
});

app.get('/route', (req, res) => {
    res.send('Hello Router, <img src="/route.png">');
});

app.listen(3000, () => {
    console.log("Connected 3000 port!");
});