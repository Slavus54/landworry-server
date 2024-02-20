const {Schema, model} = require('mongoose') 

const Cleanings = new Schema({
    shortid: String,
    username: String,
    title: String,
    category: String,
    level: String,
    dateUp: String,
    time: String,
    region: String,
    cords: {
        lat: Number,
        long: Number
    },
    dots: [{
        lat: Number,
        long: Number
    }],
    distance: Number,
    discussion: String,
    members: [{
        account_id: String,
        username: String,
        subject: String
    }],
    results: [{
        shortid: String,
        name: String,
        text: String,
        category: String,
        volume: Number,
        image: String
    }]
})  

module.exports = model('Cleanings', Cleanings)