const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Mechanic = require('../Models/mechanic');
const bcrypt = require('bcryptjs');

router.get('/', (req, res, next) => {
    Mechanic.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
});

router.post('/login', (req, res, next) => {
    Mechanic.find({ mail: req.body.mail })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    })
                }
                if (result) {
                    return res.status(200).json({
                        message: 'Auth succesufull.',
                        user: user[0]
                    });
                }
                res.status(401).json({
                    message: 'Auth failed'
                });
            })
        })
        .catch(err => {
            console.log(500).json({
                error: err
            })
        })
});

router.post('/signup', (req, res, next) => {
    Mechanic.find({ mail: req.body.mail })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail exists!"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            message: hash,
                            error: err
                        });
                    } else {
                        const mechanic = new Mechanic({
                            _id: new mongoose.Types.ObjectId(),
                            name: req.body.name,
                            surname: req.body.surname,
                            password: req.body.password,
                            mail: req.body.mail,
                        });
                        mechanic.save().then(result => {
                            console.log(result);
                            res.status(201).json({
                                message: 'User created',
                                createdUser: user
                            });
                        })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    message: "asdsad",
                                    error: err
                                })
                            });
                    }
                });
            }
        })
});

router.get('/:mail', (req, res, next) => {

    Mechanic.findOne({ mail: req.params.mail })
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: 'Nista' });
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err });
        });
});

router.delete('/:mail', (req, res, next) => {
    const mail = req.params.mail
    Mechanic.remove({ mail: mail }).exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});


module.exports = router;