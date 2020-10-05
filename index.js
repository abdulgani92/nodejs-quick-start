const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connectDB = () => {
    return new Promise(async (resolve, reject) => {
        let connect = await mongoose.connect('mongodb://localhost:27017/UserDB', { useNewUrlParser: true, useUnifiedTopology: true });
        if (connect) {
            console.log(`MongoDB conneted`)
            return resolve({ ...connect, success: true });
        }
        reject({ success: false, message: connect.Error.messages || 'Database could not connect' });
    })
}

const initRoute = () => {
    return new Promise((resolve, reject) => {
        app.use('/api/v1', require('./apis/users/route/users.route'));
        app.use('/api/v1/auth', require('./apis/auth/route/auth.route'));
        resolve({ success: true });
    })
}


const startServer = () => {
    app.listen(PORT, () => console.log(`Listening at PORT ${PORT}`));
    return true;
}

const startApp = async () => {
    try {
        const connect = await connectDB();
        const route = await initRoute();
        const server = startServer();
    } catch (error) {
        console.log(error);
    }
}

startApp();

