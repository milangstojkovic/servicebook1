const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const User=require('../Models/user');
const bcrypt=require('bcryptjs');

router.get('/', (req,res,next)=> {
    User.find()
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        res.status(500).json({
            error:err
        });
    })
});

router.post('/login', (req, res, next) => {
    User.find({username: req.body.username})
    .exec()
    .then(user => {
        if(user.length<1) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err,result)=> {
            if(err) {
                return res.status(401).json({
                    message:'Auth failed'
                })
            }
            if(result) {
                return res.status(200).json({
                    message:'Auth succesufull.',
                    user:user[0]
                    });
                }
            res.status(401).json({
                message:'Auth failed'
            });
        })
    })
    .catch( err=> {
        console.log(500).json({
            error:err
        })
    })
});

router.post('/signup', (req,res,next)=> {
    User.find({username:req.body.name})
    .exec()
    .then(user=> {
        if (user.length>=1) 
        {
            return res.status(409).json({
                message:"Username exists!"
            });
        } else 
        {
            bcrypt.hash(req.body.password, 10, (err, hash)=> {
                if(err) {
                    return res.status(500).json({
                        message:hash,
                        error:err
                    });
                } else {
                    const user=new User({
                        username: req.body.name,
                        password:hash,
                        mail: req.body.mail,
                        ismechanic: req.body.ismechanic
                });
                user.save().then(result=>{
                    console.log(result);
                    res.status(201).json({
                        message:'User created',
                        createdUser: user
                    });
                })
                .catch(err=>{
                    console.log(err);
                    res.status(500).json({
                      
                        error:err
                    })
                });
            }
        });
        }
    })  
});

router.get('/:username', (req,res,next)=> {
    const username=req.params.username;
    
    User.findById(username).exec()
    .then(doc=>{
        console.log(doc);
        if(doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({message:'Nista'});
        }
    })
    .catch(err=> {
        console.log(err)
        res.status(500).json({error:err});
    });
});

router.delete('/:username', (req,res,next)=> {
    const username=req.params.username
    User.remove({username: username}).exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err=> {
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
});


module.exports=router;