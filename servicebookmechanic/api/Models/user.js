const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	_id:mongoose.Schema.Types.ObjectId,
	name: {
		type: String,
		trim: true,
		required: true
	},
	 surname: {
		type: String,
		trim: true,
		required: true
	},
	mail:
	{
		type: String,
		trim: true,
		required: true
	},
	password: {
		type: String,
		trim: true,
		required: true
	},
	mechanicid: {
		type: String,
		trim: true,
		required: true
	}
})

module.exports = mongoose.model('user', UserSchema)
