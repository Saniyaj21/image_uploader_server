require('dotenv').config()
const mongoose = require('mongoose')

const dbName = process.env.dbName;
const dbUser = process.env.dbUser;
const dbPass = process.env.dbPass;

const connection_string = `mongodb+srv://${db_user}:${db_pass}@${db_name}.phathck.mongodb.net/?retryWrites=true&w=majority`


const connectToMongo = async () => {
    try {
        mongoose.connect(connection_string, {})
        console.log('Connected to Mongo')
    } catch (e) {
        console.log('Cant connect to Mongo. Error:')
        console.log(e)
    }
} 


mongoose.Promise = global.Promise

module.exports = mongoose
