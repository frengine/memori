
const db = require("./db")

db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT,
        password TEXT
    )
`)

function getUserByName(name) {
    return new Promise(resolve => {

        db.get(`
            SELECT * FROM users WHERE name IS ?
        `, [name], (err, user) => {
    
            err && console.log(err)
            resolve(user)
        })
    })
}

function getUserById(id) {
    return new Promise(resolve => {

        db.get(`
            SELECT * FROM users WHERE id IS ?
        `, [id], (err, user) => {
    
            err && console.log(err)
            resolve(user)
        })
    })
}

function saveUser(user) {

    return new Promise(resolve => {
        
        db.run(`
            INSERT OR REPLACE INTO users (id, name, password) VALUES (?, ?, ?)
        `, [user.id, user.name, user.password], err => {

            err && console.log(err)
            resolve(!err)
        })
    })
}

module.exports = {
    getUserByName, saveUser, getUserById
}
