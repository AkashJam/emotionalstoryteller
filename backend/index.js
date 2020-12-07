var express = require('express');
var app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

const conversationRoute = require('./routes/conversationRoute');
app.use('/', conversationRoute);


app.get('/', (req, res) => { res.send('Hello World!'); });
app.listen(3000, () =>  { console.log(`App listening on port ${port}!`); });