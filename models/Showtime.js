const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShowtimeSchema = new Schema({
    time_id: {
        type: Schema.Types.ObjectId
    },
    time_block:
        [{
            Morning: {
                type: String
            },
            Evening: {
                type: String
            },
            Night: {
                type: String
            }
        }],
        required: true
});

const Showtime = mongoose.model('showtime', ShowtimeSchema);
module.exports = Showtime;