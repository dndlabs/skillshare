const mongoose = require('mongoose');

let dburl = process.env.DBURL || 'mongodb://localhost:27017/skillshare_db';

try {
    mongoose.connect(dburl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
} catch (error) {
    console.log(error);
}