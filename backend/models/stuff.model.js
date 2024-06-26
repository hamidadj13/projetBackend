const mongoose = require('mongoose');

const { Schema } = mongoose;

const StuffSchema = new Schema ({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['selled', 'not-selled'],
        require: false,
    },
    price: {
        type: Number,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
}, {
    timestamps: true
});

const stuffSchema = mongoose.model('Stuff', StuffSchema);

module.exports = stuffSchema;
