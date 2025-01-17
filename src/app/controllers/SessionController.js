const jwt = require('jsonwebtoken');
const User = require('../models/user');
const authConfig = require('../../../config/auth');

class SessionController{
    async store(req, res){
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if(!user){
            return res.status(401).json({ error: "User doesn't exists" });
        }

        if(!(await user.checkPassword(password))){
            return res.status(401).json({ error: "Wrong password." });
        }

        const { id, name } = user;

        return res.json({
            user: {
                id,
                name,
                email,
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            })
        });
    }
}

module.exports = new SessionController();