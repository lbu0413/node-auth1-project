const router = require('express').Router()
const bcrypt = require('bcryptjs')
const Users = require('./users-model')
const express = require('express')


router.get('/', (req, res) => {
    Users.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => res.send(err))
})

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


module.exports = router;