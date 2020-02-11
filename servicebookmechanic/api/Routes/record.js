const express=require('express');

const router=express.Router();
const mongoose=require('mongoose');
const Record=require('../Models/record');

router.get('/', (req,res,next)=> {
    Record.find()
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
    const record = new Record({
        id: new mongoose.Types.ObjectId(),
        startdate: req.body.startdate,
        status: 0,
        vehicleid: req.body.vehicleid,
        answered: false,
        mechanicid: req.body.mechanicid
    })
    record.save()
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


router.get('/:recordid', (req,res,next)=> {
    const id=req.params.recordid;
    
    Record.findById(id).exec()
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


router.delete('/:recordid', (req,res,next)=> {
    const id=req.params.recordid
    record.remove({id: id}).exec()
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

router.patch('/:recordid', (req,res,next)=> {
    const id=req.params.recordid;
    record.update({id:id}, {$set: {enddate:req.body.enddate, vehiclekms:req.body.vehiclekms, note:req.body.note, answered:true, status:req.body.status}})
    .exec()
    .then(result=> {
        console.log(result);
        res.status(200).json(result);
    })
    .catch( err=> {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});


module.exports=router;