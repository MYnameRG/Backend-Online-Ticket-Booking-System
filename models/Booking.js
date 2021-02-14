const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    book_id: {
        type: Schema.Types.ObjectId
    },
    cust_id: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    mov_id: {
        type: Schema.Types.ObjectId,
        ref: 'Movie'
    },
    book_time: {
        type: Date,
        ref: 'Payment'
    },
    decision: {
        type: Boolean,
        ref: 'Payment'
    }
});

const Booking = mongoose.model('booking', BookingSchema);
module.exports = Booking;