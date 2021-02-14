const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const Customer = require('../../models/Customer');
const auth = require('../../middleware/authorization');

//Authorize the customer to use main-site 
router.get('/', auth, async (req,res)=>{
    try
    {
        const customer = await Customer.findById(req.customer.id);
        res.status(200).send('Successful Entry for the Movie-Site');      
    }
    catch(error)
    {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});

//Login the user and take the token for main-site entry 
router.post('/', [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
], async (req,res) => {
    if(!validationResult(req).isEmpty())
    {
        res.status(400).json({ errors: validationResult(req).array() });
    }
    //console.log(req.body);

    let {username, password} = req.body;

    try
    {
        //See if customer exists
        let customer = await Customer.findOne({username});
        if(!customer)
        {
            res.status(400).json({ errors: [{ msg: 'Customer not existed' }] })
        }
        
        //Verify the password
        const matchHash = await bcrypt.compare(password, customer.password);
        if(!matchHash)
        {
            res.status(400).json({ errors: [{msg: 'Invalid Password'}]});
        }

        //Payload to send as token
        const payload = {
            customer: {
                id: customer.id
            }
        };

        const duration = {
            expiresIn: 360000
        }

        //Signed digitally the token
        jwt.sign(payload, "secrettoken", duration, (err, token)=>{
            if(err) throw err;
            res.status(200).json({ tokenId: token})
        });
    }
    catch(error){
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;