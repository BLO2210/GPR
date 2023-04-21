const { kStringMaxLength } = require('buffer')
const mongoose = require ('mongoose')

const userzSchema = new mongoose.Schema({
    name: String,
    age: String,
})

const Userz = mongoose.model('Userz', userzSchema)
module.exports = Userz