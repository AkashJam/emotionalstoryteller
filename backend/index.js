var express = require('express');
const cors = require('cors');

var frontend_app = express();
var webhook_app = express();

const port = process.env.PORT || 3000;
frontend_app.use(cors()); 


frontend_app.use(express.json());
webhook_app.use(express.json());

const conversationRoute = require('./routes/conversationRoute');
const webhookRoute = require('./routes/webhookRoute');
frontend_app.use('/api', conversationRoute);
webhook_app.use('/', webhookRoute);


//app.get('/', (req, res) => { res.send('Hello World!'); });
frontend_app.listen(3000, () =>  { console.log(`App listening on port ${port}!`); });
webhook_app.listen(5000, () =>  { console.log(`App listening on port 5000!`); });