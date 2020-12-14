const router = require('express').Router()
const bcrypt = require('bcryptjs')
const Users = require('../users/users-model')
const express = require('express')


router.post('/register', (req, res) => {
    console.log('regsitering')
    const user = req.body

    const hash = bcrypt.hashSync(req.body.password, 12)
    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.status(201).json(user)
        })
        .catch(err => {
            console.log(err)
        res.status(500).json({mesasge: err.message})
        })
})

const checkUsernameExists = async (req, res, next) => {
    // username must be in the db already
    // we should also tack the user in db to the req object for convenience
    try {
        const rows = await User.findBy({ username: req.body.username })
        if (rows.length) {
            req.userData = rows[0]
            next()
        }
        else{
            res.status(401).json('username taken')
        }
    }
    catch(e) {
        res.status(500).json({ message: e.message })
    }
}

router.post('/login', (req, res) => {
    console.log('logging in')
    let { username, password } = req.body
    Users.findBy({ username })
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)){
                req.session.user = user;
                res.status(200).json({ message: `Welcome ${user.username}` })
            }
            else{
                res.status(401).json({ message: 'Invalid Credentials'})
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
})
// router.post('/login', checkUsernameExists, (req, res) => {
//     try{
//         console.log('logging in')
//     // check req.body.password against the hash saved inside req.userData.password
//     const verifies = bcrypt.compareSync(req.body.password, req.userData.password)
//     if(verifies){
//         console.log('we should save a session for this user')
//         // here is the magic
//         // A set-cookie header is set on the response
//         // An active session for this user is saved
//         req.session.user = req.userData
//         res.json(`Welcome back, ${req.userData.username}`)
//     }
//     else{
//         res.stataus(401).json('bad credentials')
//     }
//     }
//     catch(e){
//         res.status(500).json('something went wrong')
//     }
// })

router.get('/logout', (req, res) => {
    if(req.session) {
        req.session.destroy(err => {
            if(err) {
                res.json({ message: 'you cannot leave'})
            }
            else{
                res.json('goodbye')
            }
        })
    }
    else{
        res.json('there was no session')
    }
})

module.exports = router;