const db = require("./db")
const users = require("./users")

db.run(`
    CREATE TABLE IF NOT EXISTS games (
        id TEXT PRIMARY KEY,
        name TEXT,
        url TEXT
    )
`)

db.run(`
    CREATE TABLE IF NOT EXISTS topscores (
        score INT,
        gameId TEXT,
        userId TEXT,
        
        FOREIGN KEY(gameId) REFERENCES games(id),

        FOREIGN KEY(userId) REFERENCES users(id)
    )
`)

const insertGame = db.prepare(`INSERT OR REPLACE INTO games (id, name, url) VALUES (?, ?, ?)`)

const games = [
    ["01", "Memori", "/memory"]
]

games.forEach(g => insertGame.run(g))
insertGame.finalize()

function getGames() {
    return new Promise(resolve => {

        db.all(`SELECT * FROM games`, (err, rows) => {
            err && console.log(err)

            resolve(rows || [])
        })
    })
}

function getHighscores(gameId) {
    return new Promise(resolve => {

        db.all(`
            SELECT topscores.*, users.name FROM topscores 
            
            JOIN users ON topscores.userId = users.id 
            
            WHERE gameId IS ? 
            
            ORDER BY score DESC 
            LIMIT 10`, 
            
            [gameId], (err, rows) => {
                
            err && console.log(err)

            resolve(rows || [])
        })
    })
}

function getUserScores(userId) {
    return new Promise(resolve => {

        db.all(`SELECT * FROM topscores WHERE userId IS ?`, [userId], (err, rows) => {
            err && console.log(err)

            resolve(rows || [])
        })
    })
}

function saveUserScore(userId, gameId, score) {
    return new Promise(resolve => {
        db.run(`
            INSERT OR REPLACE INTO topscores (score, gameId, userId) VALUES (?, ?, ?)
        `, [score, gameId, userId], err => {

            err && console.log(err)
            resolve(!err)
        })
    })
}

module.exports = {
    getGames, getHighscores, getUserScores, saveUserScore
}
