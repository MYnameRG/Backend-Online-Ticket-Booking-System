const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OffersSchema = new Schema({
    offer_id: {
        type: Schema.Types.ObjectId
    },
    discount: {
        type: Number,
        required: true
    },
    cashback: {
        type: Number,
        required: true
    }
});

const Offer = mongoose.model('offer', OffersSchema);
module.exports = Offer;