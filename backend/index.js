var express = require('express');
const cors = require('cors');
var app = express();

const port = process.env.PORT || 3000;
app.use(cors()); 


app.use(express.json());

const conversationRoute = require('./routes/conversationRoute');
app.use('/', conversationRoute);


app.get('/', (req, res) => { res.send('Hello World!'); });
app.listen(3000, () =>  { console.log(`App listening on port ${port}!`); });