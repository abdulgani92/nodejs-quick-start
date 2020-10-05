const { verify } = require('../../../jwt/token');
const Users = require('./../model/users.model');

const createUser = (req, res) => {
    console.log('createUser');
}

const updateUser = (req, res) => {
    console.log('updateUser');
}

const getUser = (req, res) => {
    console.log('getUser');
}

const deleteUser = (req, res) => {
    console.log('deleteUser');
}

const listUsers = async (req, res) => {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).send({ success: false, message: 'No jwt token passed' }) // if there isn't any token

    const userId = await verify(token);
    if (userId) {
        const result = await Users.find({}, { password: 0 });
        const body = {
            success: true,
            users: result
        }
        return res.send(body);
    }

    return res.send({ success: false, message: 'Unauthorized user' });


}


module.exports = {
    createUser,
    updateUser,
    getUser,
    deleteUser,
    listUsers
};
