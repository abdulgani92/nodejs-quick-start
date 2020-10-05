
const { compare, hash } = require("../../../hash/hash");
const { sign } = require("../../../jwt/token");
const User = require('./../../users/model/users.model');

const signin = async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    const result = await User.findOne({ email: email });
    if (result) {
        const hashedPassword = result.password;
        const match = await compare(password, hashedPassword);
        if (match) {
            const token = sign(result._id);
            return res.status(404).send({ success: true, name: result.name, token });
        }

        return res.status(401).send({ success: false, message: `Email or password do not matched` });
    }

    return res.status(404).send({ success: false, message: `User does not exist with this ${email}` });

}

const signup = async (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    const address = req.body.address;

    const result = await User.findOne({ email: email });
    if (!result) {

        const hashedPassword = await hash(password);

        const user = new User({
            name: name,
            email: email,
            password: hashedPassword,
            phone: phone,
            address: address,
        });

        const saved = await user.save();
        const token = sign(saved._id);


        const body = {
            _id: saved._id,
            name: saved.name,
            email: saved.email,
            phone: saved.phone,
            address: saved.address,
            token,
            success: true, message: `Account created successfully`,
        }

        return res.send(body);
    }

    return res.status(400).send({ success: false, message: `User already exist with this ${email}` });
}

module.exports = {
    signin,
    signup
}
