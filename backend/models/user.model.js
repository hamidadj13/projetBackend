const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const UserSchema = new Schema ({
    firstName: {
        type: String
    },

    lastName: {
        type: String
    },

    dateOfBirth: {
        type: Date
    },
    role: {
        type: String,
        enum: ['admin', 'vendeur'],
        require: false
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    stuffs: [{
        type: Schema.Types.ObjectId,
        ref: 'Stuff'
    }]
}, {
    timestamps: true
});

UserSchema.pre('save', async function (next){
    if (this.password){
        if (this.isModified('password') || this.isNew){
            this.password = bcrypt.hashSync(this.password, 8);
        } else {
            return next();
        }
    }
    return next();
});

UserSchema.methods.comparePassword = function (pw) {
    let passwordIsValid = bcrypt.compareSync(pw, this.password);

    return !!passwordIsValid;
}

UserSchema.methods.getJWT = function(){

    return jwt.sign({
        id: this._id.toString()
    },TOKEN_SECRET, {
        expiresIn: 85000
    });
}

const userSchema = mongoose.model('User', UserSchema);

module.exports = userSchema;
