const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SeatsSchema = new Schema({
    seat_id: {
        type: Schema.Types.ObjectId,
    },
    total: {
        type: Number,
        required: true
    },
    available: {
        type: Number,
        required: true
    },
    free: {
        type: Number,
        required: true
    },
    pattern: {
        type: [Schema.Types.Mixed]
    }
});

const Seats = mongoose.model('seats', SeatsSchema);
module.exports = Seats;