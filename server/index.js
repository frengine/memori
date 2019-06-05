const express = require('express');
const fs = require('fs');
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const expressJwt = require('express-jwt');

const privateKey = fs.readFileSync('./private.pem', 'utf8');
const publicKey = fs.readFileSync('./public.pem', 'utf8');

const checkIfAuthenticated = expressJwt({
    secret: publicKey,
    userProperty: 'payload'
});

const signOptions = {
    expiresIn: "30d",
    algorithm: 'ES256'
};

const users = require('./users')
const games = require('./games')

// Express

const app = express();

app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS")
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization")
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
        let payload = { id: user.id };
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

app.put('/api/user', checkIfAuthenticated, async (req, res) => {

    let user = await users.getUserById(req.payload.id)

    const name = req.body.name || user.name
    const password = req.body.password || user.password

    console.log(name, password)

    if (name.toLowerCase() != user.name.toLowerCase() && await users.getUserByName(name))
        return res.status(401).json({ message: "Name already taken" })

    if (await users.saveUser({
        id: user.id,
        name, password
    }))
        res.json({ message: 'ok' })
    else
        res.status(500).json({ message: "something went wrong" })
})

app.get('/api/user/:id', async (req, res) => {
    const user = await users.getUserById(req.params.id)
    if (user)
        res.json({id: user.id, name: user.name})
    else
        res.status(401).json({ message: "User does not exist" })
})

app.get('/api/games', async (req, res) =>
    res.json(await games.getGames())
)

app.get('/api/games/:id', async (req, res) => {
    const game = (await games.getGames()).find(g => g.id == req.params.id)
    if (game)
        res.json(game)
    else
        res.status(401).json({ message: "Game does not exist" })
})

app.get('/api/topscores/:gameId', async (req, res) => res.json(await games.getHighscores(req.params.gameId)))

app.get('/api/myscores/:userId', async (req, res) => res.json(await games.getUserScores(req.params.userId)))

app.post('/api/myscores/:gameId', checkIfAuthenticated, async (req, res) => {

    if (await games.saveUserScore(req.payload.id, req.params.gameId, Number(req.body.score)))
        res.json({ message: 'ok' })
    else
        res.status(401).json({ message: "Something went wrong. Is the gameId incorrect?" })
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

setTimeout(async () => {

    console.log("games:", await games.getGames())
    console.log("highscores memory:", await games.getHighscores("01"))

}, 100)
