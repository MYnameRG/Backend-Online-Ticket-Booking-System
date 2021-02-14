const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const customer = require('../../models/Customer');

router.get('/', (req,res)=>{
    res.status(200).send('Booking Route');
});

module.exports = router;