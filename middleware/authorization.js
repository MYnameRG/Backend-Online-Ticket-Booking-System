const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
    const token = req.header('x-auth-token');
    
    //Verify the token
    if(!token)
    {
        res.send(401).json({msg: 'You need token'});
    }

    try
    {
        const decoded = jwt.verify(token, 'secrettoken')
        req.customer = decoded.customer;
        next();
    }
    catch(error){
        res.status(401).json({msg: 'Invalid Token'});
    }
}

module.exports = authorize;