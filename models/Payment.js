const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    payment_id: {
        type: Schema.Types.ObjectId
    },
    cust_id: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    upi: {
        type: [String],
        required: true
    },
    cardholder: {
        type: [String],
        required: true
    },
    decision: {
        type: Boolean,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    book_time: {
        type: Date,
        default: Date.now
    }
});

const Offer = mongoose.model('offer', OffersSchema);
module.exports = Offer;