const graphql = require('graphql')
const { getBooking, getRoomBookings, getUserBookings, getHotelBookings } = require('./queries/bookingQueries.js')
const { getHotel, getAllHotels, searchHotels, getHotelByID } = require('./queries/hotelQueries.js')
const { getRoom, getAllRooms } = require('./queries/roomQueries.js')
const { login, getUser, getAllUsers } = require('./queries/userQueries.js')

const { GraphQLObjectType } = graphql

const Query = new GraphQLObjectType({
    name: "Query",
    fields: {
        login,
        getUser,
        getAllUsers,
        getHotel,
        getHotelByID,
        searchHotels,
        getAllHotels,
        getRoom,
        getAllRooms,
        getBooking,
        getUserBookings,
        getHotelBookings,
        getRoomBookings
    }
})

module.exports = Query