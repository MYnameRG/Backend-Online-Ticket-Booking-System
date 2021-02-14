const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    mov_id: {
        type: Schema.Types.ObjectId
    },
    poster_location: {
        type: String,
        required: true
    },
    mov_name: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    cast: {
        type: [String],
        required: true
    },
    genre: {
        type: [String],
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    released: {
        type: String,
        required: true
    },
    reviews: [
        {
        avatar: {
            type: String
        },
        username: {
            type: String,
            required: true
        },
        post: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
]
});

const Movie = mongoose.model('movie', MovieSchema);
module.exports = Movie;