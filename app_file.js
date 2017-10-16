var express = require('express');
var app = express();
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage: storage });
var fs = require('fs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/user', express.static('uploads'));
app.locals.pretty = true;
app.set('views', './views_file');
app.set('view engine', 'jade');

app.get('/upload', function(req, res) {
	res.render('upload');
});

app.post('/upload', upload.single('userfile'), function(req, res) {
	res.send('Uploaded:' + req.file.filename);
});

app.get('/topic/new', function(req, res) {

	fs.readdir('data', function(err, files) {
		if(err) {
			console.log(err);
			res.status(500).send('Internal Server Error');
		}

		res.render('new', {topics: files});
	});
});

app.get(['/topic', '/topic/:id'], function(req, res) {
	fs.readdir('data', function(err, files) {
		if(err) {
			console.log(err);
			res.status(500).send('Internal Server Error');
		}

		var id = req.params.id;
		if(id) {
			fs.readFile('data/' + id, 'utf8', function(err, data) {
				if(err) {
					console.log(err);
					res.status(500).send('Internal Server Error')
				}

				res.render('view', {topics: files, title: id, description: data});
			});
		}
		else {
			res.render('view', {topics: files, title: 'Welcome', description: 'Hello Javascript for server'});
		}
	});
});

app.post('/topic', function(req, res) {
	var title = req.body.title;
	var description = req.body.description;

	fs.writeFile('data/' + title, description, function(err) {
		if(err) {
			console.log(err);
			res.status(500).send('Internal Server Error');
		}
		res.redirect('/topic/' + title);
	});
});
const port = 3000;
app.listen(port, function() {
	console.log(`Connected, ${port} port!`);
});