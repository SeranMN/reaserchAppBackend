const User = require('../Model/user');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
//Add project

const addUser = async (req, res) => {

    let saltRounds = 10;
    console.log(req.body)
    if (req.body) {
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            password = hash
            const user = new User(
                {
                    username: req.body.username,
                    password: password,
                    name: req.body.name
                }
            )

            user.save()
                .then((data) => { res.status(200).send({ data: data }) })
                .catch((err) => { res.status(500).send(err) });
        });

    }
};

const getUserByUserName = async (req, res) => {
    if (req) {
        await User.findOne({ username: req.params.email })
            .then((data) => {

                if (data) {
                    const match = bcrypt.compareSync(req.body.password, data.password);
                    console.log("match", match)
                    console.log(data)
                    if (match) {

                        const token = jwt.sign(data.username, process.env.JWT_SECRET_KEY)
                        res.header(process.env.TOKEN_HEADER_KEY,token).send({
                            
                            "name": data.name,
                            "email":data.username
                           
                        })
                        
                    }
                    else {
                        res.send('Password does not match')
                        res.status(404)
                    }

                } else {
                    res.send('Invalid User')
                    res.status(404)
                }
            })
            .catch((err) => { res.status(400).send(err) })
    }
}
const updateUser = async (req, res) => {
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    try {
        const token = req.header(tokenHeaderKey);

        const verified = jwt.verify(token, jwtSecretKey);
        if (verified) {
            await User.findByIdAndUpdate(req.params.id, req.body)
                .then((data) => { res.status(200).send(data) })
                .catch((err) => { res.status(500).send(err) });
        } else {
            return res.status(401).send("error");
        }
    }catch(err) {
        return res.status(401).send(err);
    }
}
    
    
    


const deleteUser = async (req, res) => {
   
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    
    try {
        const token = req.header(tokenHeaderKey);

        const verified = jwt.verify(token, jwtSecretKey);
        if (verified) {
            await User.findByIdAndDelete(req.params.id)
                .then(() => res.status(200).send('Successfully Deleted'))
                .catch((err) => { res.status(500).send(err) })
        } else {
            res.sendStatus(401)
        }
    } catch (err) {
        return res.status(401).send(err);
}

        
}



module.exports = {
    addUser,
    getUserByUserName,
    updateUser,
    deleteUser
};
