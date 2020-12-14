const router = require('express').Router()
const bcrypt = require('bcryptjs')
const Users = require('./users-model')
const express = require('express')

const restricted = (req, res, next) => {
    if(req.session && req.session.user) {
        next()
    }
    else{
        res.status(401).json('unauthroized')
    }
}
router.get('/', restricted, (req, res) => {
    Users.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => res.send(err))
})




module.exports = router;