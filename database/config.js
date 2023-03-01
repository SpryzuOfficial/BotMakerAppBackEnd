const mongoose = require('mongoose');

const connectToDB = async() =>
{
    try
    {
        mongoose.set('strictQuery', true);
        
        await mongoose.connect(process.env.MONGO_DB);
        console.log('Connected to DB');
    }
    catch(error)
    {
        console.log(error);
    }
}

module.exports = connectToDB;