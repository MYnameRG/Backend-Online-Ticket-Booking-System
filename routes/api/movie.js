const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const Movie = require('../../models/Movie');
const Customer = require('../../models/Customer');

router.get('/', async (req,res) => {
    try
    {
        //Extract All Documents
        await Movie.find((err,data) => {
            if(err)
            {
                return res.status(400).json({ errors: [{msg: "No Movies Uploaded"}] });
            }
            return res.status(200).json({ data });
        });
    }
    catch(error)
    {
        console.log(error.message);
        return res.status(500).send('Server Error');
    }
});

router.get('/:id', async (req, res) => {
    try
    {
        //Extract particular movie
        let movie = await Movie.findOne({ _id: req.params.id });
        return res.status(200).json({ movie });
    }
    catch(error)
    {
        console.log(error.message);
        return res.status(500).send('Server Error');
    }
});

router.post('/:id/reviews/:cust', [
    check('text','Text is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try
    {
        //Extract particular movie
        let movie = await Movie.findOne({ _id: req.params.id });
        let customer = await Customer.findOne({ _id: req.params.cust });
        movie.reviews.push({
            avatar: customer.avatar,
            username: customer.username,
            post: req.body.text
        });
        //onsole.log(req);
        await Movie.findOneAndUpdate({ mov_name: movie.mov_name }, { reviews: movie.reviews });
        return res.status(200).json({ msg: `New reviews added in ${ movie.mov_name } by username ${ customer.username }` });
    }
    catch(error)
    {
        console.log(error.message);
        return res.status(500).send('Server Error');
    }
});

module.exports = router;