const express = require('express');
const app = express();
require('./db/mongoose');

// Express set up
let port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));

// Start express server
app.listen(port, () => console.log('Server started on port ' + port));