const {Schema, model} = require('mongoose') 

const Products = new Schema({
    shortid: String,
    username: String,
    title: String,
    category: String,
    level: String,
    country: String,
    status: String,
    image: String,
    reviews: [{
        shortid: String,
        name: String,
        text: String,
        criterion: String,
        rating: Number, 
        dateUp: String
    }],
    offers: [{
        shortid: String,
        name: String,
        marketplace: String,
        cost: Number,
        cords: {
            lat: Number,
            long: Number
        },
        likes: Number
    }]
})  

module.exports = model('Products', Products)