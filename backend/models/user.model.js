const mongoose = require('mongoose');

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

const userSchema = mongoose.model('User', UserSchema);

module.exports = userSchema;
