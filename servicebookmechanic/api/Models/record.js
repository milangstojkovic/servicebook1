const mongoose=require('mongoose');

const RecordSchema=new mongoose.Schema({
	_id:mongoose.Schema.Types.ObjectId,
	name:{
		type:String,
		trim:true,
		required:true
	},
	startdate:
	{
		type:Date,
		trim:true,
		required:true
    },
    enddate:
	{
		type:Date,
		trim:true,
		required:false
	},
	note:{
		type:String,
		trim:true,
		required:false
	},
	vehiclekms:
	{
		type:Number,
		trim:true,
		required:false
    },
    status:{
		type:Number,
		trim:true,
		required:true
    },
    vehicleid: {
        type:String,
		trim:true,
		required:true
    },
    answered: {
        type:Boolean,
		trim:true,
		required:true
    },
	mechanicid: {
        type: String,
        trim:true,
        required:true
	},
	price:{
		type:Number,
		trim:true,
		reqired:false
	}
})

module.exports=mongoose.model('record', RecordSchema)
