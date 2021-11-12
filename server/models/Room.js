const mongoose = require('mongoose')

const Schema = mongoose.Schema

const RoomSchema = new Schema({
    image: String,
    name: String,
    description: String,
    occupancy: {
        children: Number,
        adults: Number,
    },
    others: [String],
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel'
    },
    price: Number,
    addedOn: {type: Date, default: Date.now},
    ratings: {type: Number, default: null},
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
    }]
})

module.exports = new mongoose.model('Room', RoomSchema)