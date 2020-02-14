const express=require('express');

const router=express.Router();
const mongoose=require('mongoose');
const Vehicle=require('../Models/vehicle');

router.get('/', (req,res,next)=> {
    Vehicle.find()
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

router.post('/', (req, res, next) => {
    const vehicle = new Vehicle({
        _id: new mongoose.Types.ObjectId(),
        manufactor: req.body.manufactor,
        model:req.body.model,
        modelyear: req.body.modelyear,
        ownerid: req.body.ownerid
    })
    vehicle.save()
        .then(result=>{
            console.log(result);
            res.status(201).json(result);
        })
        .catch(err=> {
            console.log(err);
            res.status(500).json({
                error:err
            })
        })
});


router.get('/:ownerid', (req,res,next)=> {
    const id=req.params.ownerid;  
    Vehicle.find({ownerid:id}).exec()
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


router.delete('/:vehicleid', (req,res,next)=> {
    const id=req.params.vehicleid
    vehicle.remove({_id: id}).exec()
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