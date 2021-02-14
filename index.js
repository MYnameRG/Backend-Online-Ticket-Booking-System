const express = require('express');
const connectDB = require('./dbserver');

const app = express();
connectDB;

const bodyParsar = express.json({ extended: false });
app.use(bodyParsar);

app.get('/', (req,res)=>{
    res.send('API Running');
});

app.use('/api/register', require('./routes/api/signup'));
app.use('/api/login', require('./routes/api/login'));
app.use('/api/movie', require('./routes/api/movie'));
app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/payment', require('./routes/api/payment'));
app.use('/api/booking', require('./routes/api/booking'));

const port = process.env.port || 2000;

app.listen(port, (req,res)=>{
    console.log(`Server is running on ${port}`);
});