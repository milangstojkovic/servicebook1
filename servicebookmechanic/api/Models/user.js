const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
	username:{
		type:String,
		trim:true,
		required:true
	},
	mail:
	{
		type:String,
		trim:true,
		required:true
	},
	password:{
		type:String,
		trim:true,
		required:true
	},
	ismechanic:
	{
		type:Boolean,
		trim:true,
		required:true
	}
	
})

module.exports=mongoose.model('user', UserSchema)
