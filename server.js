'use strict';

var express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');

// require and use "multer"...
const multer = require('multer');
const upload = multer({dest: 'public/'});

var app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.post('/api/fileanalyse', upload.single('upfile') , function (req, res, next) {
  const file = req.file
  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  })
})

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
