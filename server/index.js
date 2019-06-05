const express = require('express');
const fs = require('fs');
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const expressJwt = require('express-jwt');

const privateKey = fs.readFileSync('./private.pem', 'utf8');
const publicKey = fs.readFileSync('./public.pem', 'utf8');

const checkIfAuthenticated = expressJwt({
    secret: publicKey
});

const signOptions = {
    expiresIn: "30d",
    algorithm: 'ES256'
};

const users = require('./users')

// Express

const app = express();

app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type")
    next()
})

app.use(bodyParser());

//parse json for APIs
app.use(bodyParser.json());

app.get('/api', (req, res) => {
    res.json({ message: 'hallo allemaal...' })
});

app.post('/api/login', async (req, res) => {
    if (req.body.name && req.body.password) {
        var name = req.body.name;
    }

    var user = await users.getUserByName(name)

    if (!user) {
        res.status(401).json({ message: 'no such user found' });
    }

    if (user.password === req.body.password) {
        let payload = { name, id: user.id };
        let token = jwt.sign(payload, privateKey, signOptions);
        res.json({
            message: 'ok',
            expiresIn: jwt.decode(token).exp,

            user: {
                name: user.name,
                id: user.id,
                token,
            }
        });
    } else {
        res.status(401).json({ message: 'password did not match' });
    }
})

app.post('/api/user', async (req, res) => {

    const name = req.body.name
    const password = req.body.password

    if (!name || !password)
        return res.status(401).json({ message: "Please enter both name and password"} )

    if (await users.getUserByName(name))
        return res.status(401).json({ message: "Name already taken" })

    if (await users.saveUser({
        id: Math.floor(Math.random() * 99999999),
        name, password
    }))
        res.json({ message: 'ok' })
    else
        res.status(500).json({ message: "something went wrong" })
})

app.route('/api/secret')
    .get(checkIfAuthenticated, function (req, res) {
        res.json({ message: "Success! You can not see this without a token" });
    })

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
    console.log("Express starting listening on port " + PORT)
    console.log("Express running")
});
