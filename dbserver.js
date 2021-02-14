const mongoose = require('mongoose');
const dburl = 'mongodb+srv://ticketBooking:rohit1997@cluster0.t2k1o.mongodb.net/ticketBooking?retryWrites=true&w=majority';

const connection = mongoose.connect(dburl,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}).then(()=>{
    console.log('MongoDB connected...');
}).catch((err)=>{
    console.log(err);
});

module.exports = connection;