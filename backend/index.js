var express = require('express');
const cors = require('cors');

var app = express();
//var webhook_app = express();

const port = process.env.PORT || 3000;
app.use(cors()); 


app.use(express.json());

const conversationRoute = require('./routes/conversationRoute');
const webhookRoute = require('./routes/webhookRoute');
app.use('/api', conversationRoute);
app.use('/', webhookRoute);


//app.get('/', (req, res) => { res.send('Hello World!'); });
app.listen(3000, () =>  { console.log(`App listening on port ${port}!`); });