const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.locals.pretty = true;
app.set('views', './views_file');
app.set('view engine', 'jade');

app.get('/topic/new', (req, res) => {
    fs.readdir('data', (err, files) => {
        if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error!');
        }
        res.render('new', { topics: files });
    });
});

app.get(['/topic', '/topic/:id'], (req, res) => {
    fs.readdir('data', (err, files) => {
        if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error!');
        }

        var id = req.params.id;

        if(id) {
            fs.readFile('data/' + id, 'utf8', (err, data) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error!');
                }
                res.render('view', { topics: files, title: id, description: data });
            });
        }
        else {
            res.render('view', { topics: files, title: 'Welcome', description: 'Hello, JavaScript for server.' });
        }
    });
});

app.post('/topic', (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    fs.writeFile('data/' + title, description, (err) => {
        if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error!');
        }
        res.redirect('/topic/'+title); 
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Connected, ${PORT} port!`);
});