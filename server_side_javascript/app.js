var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.set('view engine', 'jade');
app.set('views','./views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));  //바디파서 사용, post전송된 데이터를 받을때 필요함!
app.locals.pretty = true;
app.get('/template', function(req,res){
  res.render('temp', {time:Date(), _title:'제목'});
});
app.get('/form', function(req, res){
  res.render('form');
});
app.get('/form_submit', function(req, res){
  var title = req.query.title;
  var description = req.query.description;
  res.send(title+','+description);
});
app.post('/form_submit', function(req, res) {
  var title = req.body.title;
  var description = req.body.description;
  res.send(title+','+description);
});
app.get('/topic', function(req, res){
  var topics = [
    'Javascript is....',
    'Nodejs is...',
    'Express is...'
  ];
  var output = `
  <a href="/topic?id=0">JavaScript</a><br>
  <a href="/topic?id=1">Nodejs</a><br>
  <a href="/topic?id=2">Express</a><br><br>
  ${topics[req.query.id]}
  `
  res.send(output);
});
app.get('/topic/:id/:mode', function(req, res){
  res.send(req.params.id+','+req.params.mode)
});
app.get('/', function(req, res){
  res.send('Hello home page');
});
app.get('/login', function(req, res){
  res.send('login plz');
});
app.listen(3000, function(){
  console.log('Connected 3000 port');
})
