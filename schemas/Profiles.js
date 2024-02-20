const {Schema, model} = require('mongoose') 

const Profiles = new Schema({
    account_id: String,
    username: String,
    password: String,
    telegram: String,
    timestamp: String,
    radius: Number,
    region: String,
    cords: {
        lat: Number,
        long: Number
    },
    main_photo: String,
    services: [{
        shortid: String,
        title: String,
        category: String,
        level: String,
        cost: Number,
        image: String,
        likes: Number
    }],
    account_components: [{
        shortid: String,
        title: String,
        path: String
    }]
})

module.exports = model('Profiles', Profiles)