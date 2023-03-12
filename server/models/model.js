const mongoose = require('mongoose')

const Schema = mongoose.Schema;

// categories = type,colour
const categories_model = new Schema({
    type:{type:String,default:'Investment'},
    colour:{type:String,default:'#023020'}
})

// transaction = name,type,amount,date
const transaction_model = new Schema({
    name:{type:String,default:'Anonymus'},
    type:{type:String,default:'Investment'},
    amount:{type:Number},
    date:{type:Date,default:Date.now},
})

const Categories = mongoose.model('categories',categories_model)
const Transactions = mongoose.model('transaction',transaction_model)

exports.default = Transactions;

module.exports = {
    Categories,
    Transactions
}