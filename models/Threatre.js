const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ThreatreSchema = new Schema({
    threatre_id: {
        type: Schema.Types.ObjectId
    },
    mov_id: {
        type: Schema.Types.ObjectId,
        ref: 'Movie'
    },
    time_id: {
        type: Schema.Types.ObjectId,
        ref: 'Showtime'
    },
    seat_id: {
        type: Schema.Types.ObjectId,
        ref: 'Seats'
    },
    threatre_name: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    hall_no: {
        type: Number,
        required: true
    },
    offer_id: {
        type: Number,
        ref: 'Offers'
    },
    price: {
        type: Number,
        required: true
    }
});

const Threatre = mongoose.model('threatre', ThreatreSchema);
module.exports = Threatre;
