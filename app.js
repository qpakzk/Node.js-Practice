const express = require('express');
const app = express();
app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));
app.locals.pretty = true;
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
})
app.get('/route', (req, res) => {
    res.send('Hello Router, <img src="/route.png">');
});

app.listen(3000, () => {
    console.log("Connected 3000 port!");
});