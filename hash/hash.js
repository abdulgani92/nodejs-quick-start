const bcrypt = require('bcrypt');
const saltRound = 10;

const hash = (value) => {
    return new Promise(async (resolve, reject) => {

        if (!value) {
            return reject({ message: 'input value is empty' });
        }

        let result = await bcrypt.hash(value, saltRound);
        if (result) {
            return resolve(result);
        }
        return resolve(null);
    })
}

const compare = (value, hash_value) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await bcrypt.compare(value, hash_value);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    hash,
    compare
}