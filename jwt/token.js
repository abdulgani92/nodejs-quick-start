const jwt = require('jsonwebtoken');
const jwt_key = 'shhhhh';
const Users = require('./../apis/users/model/users.model');

const sign = (userId) => {
    var token = jwt.sign({ userId: userId }, jwt_key);
    return token;
}

const verify = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, jwt_key, async (error, decoded) => {
            if (error) {
                return resolve(null);
            }

            console.log(decoded);
            const userId = decoded.userId;
            console.log(userId);

            if (userId) {
                const result = await Users.findOne({ _id: userId });
                if (result) {
                    resolve(result._id);
                }
            }
        });
    });
}

module.exports = {
    sign,
    verify
}