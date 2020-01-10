const express = require('express');
const app = express();
const userRouter = require('./routers/userRouter');
require('./db/mongoose');

// Express set up
let port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(userRouter);

// Start express server
app.listen(port, () => console.log('Server started on port ' + port));