const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const Movie = require('../../models/Movie');
const uploader = require('../../middleware/posterUploader');

router.get('/', (req,res)=>{
    res.status(200).send('Admin Route');
});

router.post('/',  uploader.single('poster'), [
    check('poster_location', 'Location is required').not().isEmpty(),
    check('mov_name', 'Name is required').not().isEmpty(),
    check('year', 'Year is required').not().isEmpty(),
    check('about', 'About is required').not().isEmpty(),
    check('cast', 'Cast is required').not().isEmpty(),
    check('genre', 'Genre is required').not().isEmpty(),
    check('rating', 'Rating is required').not().isEmpty(),
    check('released', 'Release is required').not().isEmpty(),
], async (req,res) => {
    const errors = validationResult(req);
    if(!errors)
    {
        return res.status(400).json({ errors: errors.array() });
    }

    const {mov_name, year, about, cast, genre, rating, released} = req.body;
    const poster_location = req.file.path;

    try
    {
        //See if the movie is available or not
        let movie = await Movie.findOne({ mov_name });
        if(movie)
        {
            return res.status(400).json({ errors: [{msg: "Movie already exists"}] });
        }

        movie = new Movie({
            poster_location,
            mov_name, year, about,
            cast, genre, rating, released
        });

        await movie.save();

        return res.status(400).json({ msg: 'Successfully Movie Uploaded' });
    }
    catch(error)
    {
        console.log(error.message);
        return res.status(500).send('Server Error');
    }
    
});

module.exports = router;