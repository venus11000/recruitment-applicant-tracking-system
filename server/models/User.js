const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	fullName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	phone: {
		type: String,
	},
	company: String,
	role: {
		type: String,
	},
	password: {
		type: String,
	},
	google: {
		id: String,
		token: String
	}
});

userSchema.methods.comparePassword = function (pw, cb) {
	bcrypt.compare(pw, this.password, function (err, isMatch) {
		if (err) {
			return cb(err);
		}
		cb(null, isMatch);
	});
};

module.exports = mongoose.model('User', userSchema);