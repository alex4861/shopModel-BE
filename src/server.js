const express = require("express");
const app = express();
const https = require('https');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');


app.use(bodyParser.json());
app.use(require("cors")()); // allow Cross-domain requests
app.set('port', process.env.PORT || 1234);
require('./app/routes/routes')(app,cors, mongoose);

app.listen(app.get('port'), () => {
  console.log("Server is listening on port:"+app.get('port'));
});
;