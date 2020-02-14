const mongoose=require('mongoose');

const VehicleSchema=new mongoose.Schema({
	id:mongoose.Schema.Types.ObjectId,
	manufactor:
	{
		type:String,
		trim:true,
		required:true
	},
	model:{
		type:String,
		trim:true,
		required:true
	},
	modelyear:
	{
		type:Number,
		trim:true,
		required:true
    },
    ownerid:{
		type:String,
		trim:true,
		required:true
	}
	
})

module.exports=mongoose.model('vehicle', VehicleSchema)
