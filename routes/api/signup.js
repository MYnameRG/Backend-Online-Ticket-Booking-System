const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const Customer = require('../../models/Customer');

//Test service
router.get('/', (req,res)=>{
    res.status(200).send('Signup Route');
});

//Register the user and take the token for main-site entry 
router.post('/', [
    check('fname', 'First Name is required').not().isEmpty(),
    check('lname', 'Last Name is required').not().isEmpty(),
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please enter a valid email address').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
], async (req,res) => {
    if(!validationResult(req).isEmpty())
    {
        res.status(400).json({ errors: validationResult(req).array() });
    }
    //console.log(req.body);

    let {fname, lname, username, email, password} = req.body;

    try
    {
        //See if customer exists
        let customer = await Customer.findOne({username});
        if(customer)
        {
            res.status(400).json({ errors: [{ msg: 'Customer already existed' }] })
        }

        //Generate url for image
        const avatar = gravatar.url(username, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });
        
        //Encrypt the password
        const saltedValue = await bcrypt.genSalt(15);
        password = await bcrypt.hash(password, saltedValue);

        customer = new Customer({
             fname,
             lname, username, 
             email, password,
             avatar
        });
        
        await customer.save();

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
            res.status(200).json({ 
                tokenId: token,
                msg: 'Entry to Movie-Site via GET through Login directly'
             })
        });
    }
    catch(error){
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;