const express = require('express');
const app = express();
const db_config = require(__dirname + '/config/db.js');
const conn = db_config.init();
const bodyParser = require('body-parser');

db_config.connect(conn);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.get('/', (req, res) => {
  res.send('Root');
});

app.get('/member', (req, res) => {
  let sql = 'SELECT * FROM member';
  conn.query(sql, function(err, rows, fields){
    if(err) console.log('query fail' + err);
    else res.render('mem.ejs', {list : rows});
  });
});

app.listen(3000, () => {
  console.log(`Example app listening at`);
});