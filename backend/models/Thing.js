const mongoose = require('mongoose')

const thingSchema = mongoose.Schema({
    name: {type: String, required: true},
    imageUrl: {type: String, required: true}
})