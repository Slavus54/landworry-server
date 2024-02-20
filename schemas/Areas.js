const {Schema, model} = require('mongoose') 

const Areas = new Schema({
    shortid: String,
    username: String,
    title: String,
    category: String,
    format: String,
    region: String,
    cords: {
        lat: Number,
        long: Number
    },
    rating: Number,
    needs: [{
        shortid: String,
        name: String,
        text: String,
        category: String,
        cost: Number,
        supports: Number
    }],
    buildings: [{
        shortid: String,
        name: String,
        title: String,
        architecture: String,
        cords: {
            lat: Number,
            long: Number
        },
        photo: String
    }]
})  

module.exports = model('Areas', Areas)