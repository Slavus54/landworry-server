const app = require('express')()
const jwt = require('jsonwebtoken')
const {gql} = require('apollo-server-express')

const PORT = process.env.PORT || 4000

// API

const towns = require('./api/towns.json')

// schemas

const Profiles = require('./schemas/Profiles')  
const Areas = require('./schemas/Areas')  
const Products = require('./schemas/Products')  
const Cleanings = require('./schemas/Cleanings')  

// microservices

const {middleware, mongo_connect, apollo_start, slicer, get_id} = require('./microservices/microservices')

// database url

const url = 'mongodb+srv://Slavus54:ieOUiW5CNwW5gQ5D@web-2024.v43n3ay.mongodb.net/Landworry-RU'

// middlewares

middleware(app)

// connect to MongoDB

mongo_connect(url, 'MongoDB is connected...')

// responses

const {  
    PERSONAL_INFO_SUCCESS, PERSONAL_INFO_FALL,
    GEO_INFO_SUCCESS, GEO_INFO_FALL, 
    COMMON_INFO_SUCCESS, COMMON_INFO_FALL, 
    PASSWORD_SUCCESS, PASSWORD_FALL,
    SERVICE_CREATED, SERVICE_LIKED, SERVICE_UPDATED, SERVICE_DELETED, SERVICE_FALL
} = require('./responses/profile-responses')

const {
    AREA_CREATED, AREA_FALL,
    AREA_UPDATED_SUCCESS, AREA_UPDATED_FALL,
    AREA_NEED_CREATED, AREA_NEED_SUPPORTED, AREA_NEED_DELETED, AREA_NEED_FALL,
    AREA_BUILDING_CREATED, AREA_BUILDING_FALL
} = require('./responses/area-responses')

const {
    PRODUCT_CREATED_SUCCESS, PRODUCT_CREATED_FALL,
    PRODUCT_INFO_UPDATED, PRODUCT_INFO_FALL,
    PRODUCT_REVIEW_CREATED, PRODUCT_REVIEW_FALL,
    PRODUCT_OFFER_CREATED, PRODUCT_OFFER_LIKED, PRODUCT_OFFER_DELETED, PRODUCT_OFFER_FALL
} = require('./responses/product-responses')

const {
    CLEANING_CREATED_SUCCESS, CLEANING_CREATED_FALL,
    CLEANING_MEMBER_JOINED, CLEANING_MEMBER_UPDATED, CLEANING_MEMBER_EXIT, CLEANING_MEMBER_FALL,
    CLEANING_DISCUSSION_UPDATED, CLEANING_DISCUSSION_FALL,
    CLEANING_RESULT_CREATED, CLEANING_RESULT_FALL
} = require('./responses/cleaning-responses')

const typeDefs = gql`
    type Cord {
        lat: Float!,
        long: Float!
    }
    input ICord {
        lat: Float!,
        long: Float!
    }
    type UserCookie {
        account_id: String!,
        username: String!
    }
    type AccountComponent {
        shortid: String!,
        title: String!,
        path: String!
    }
    type Service {
        shortid: String!,
        title: String!,
        category: String!,
        level: String!,
        cost: Float!,
        image: String!,
        likes: Float!
    }
    type Need {
        shortid: String!,
        name: String!,
        text: String!,
        category: String!,
        cost: Float!,
        supports: Float!
    }
    type Building {
        shortid: String!,
        name: String!,
        title: String!,
        architecture: String!,
        cords: Cord!,
        photo: String!
    }
    type Review {
        shortid: String!,
        name: String!,
        text: String!,
        criterion: String!,
        rating: Float!, 
        dateUp: String!
    }
    type Offer {
        shortid: String!,
        name: String!,
        marketplace: String!,
        cost: Float!,
        cords: Cord!,
        likes: Float!
    }
    type Member {
        account_id: String!,
        username: String!,
        subject: String!
    }
    type Result {
        shortid: String!,
        name: String!,
        text: String!,
        category: String!,
        volume: Float!,
        image: String!
    }
    type Cleaning {
        id: ID!,
        shortid: String!,
        username: String!,
        title: String!,
        category: String!,
        level: String!,
        dateUp: String!,
        time: String!,
        region: String!,
        cords: Cord!,
        dots: [Cord]!,
        distance: Float!,
        discussion: String!,
        members: [Member]!,
        results: [Result]!
    }
    type Product {
        id: ID!,
        shortid: String!,
        username: String!,
        title: String!,
        category: String!,
        level: String!,
        country: String!,
        status: String!,
        image: String!,
        reviews: [Review]!,
        offers: [Offer]!
    }
    type Area {
        shortid: String!,
        username: String!,
        title: String!,
        category: String!,
        format: String!,
        region: String!,
        cords: Cord!,
        rating: Float!,
        needs: [Need]!,
        buildings: [Building]!
    }
    type Profile {
        account_id: String!,
        username: String!,
        password: String!,
        telegram: String!,
        timestamp: String!,
        radius: Float!,
        region: String!,
        cords: Cord!,
        main_photo: String!,
        services: [Service]!,
        account_components: [AccountComponent]!
    }
    type Query {
        getProfiles: [Profile]!
        getAreas: [Area]!
        getProducts: [Product]!
        getCleanings: [Cleaning]!
    }
    type Mutation {
        createProfile(username: String!, password: String!, telegram: String!, timestamp: String!, radius: Float!, region: String!, cords: ICord!, main_photo: String!) : UserCookie!
        loginProfile(password: String!) : UserCookie!
        getProfile(account_id: String!) : Profile
        updateProfilePersonalInfo(account_id: String!, main_photo: String!) : String!
        updateProfileGeoInfo(account_id: String!, region: String!, cords: ICord!) : String!
        updateProfileCommonInfo(account_id: String!, timestamp: String!, radius: Float!) : String!
        updateProfilePassword(account_id: String!, password: String!) : String!
        manageProfileService(account_id: String!, option: String!, title: String!, category: String!, level: String!, cost: Float!, image: String!, coll_id: String!) : String!
        createArea(username: String!, id: String!, title: String!, category: String!, format: String!, region: String!, cords: ICord!, rating: Float!) : String!
        getArea(shortid: String!) : Area!
        manageAreaNeed(username: String!, id: String!, option: String!, text: String!, category: String!, cost: Float!, coll_id: String!) : String!
        updateAreaInfo(username: String!, id: String!, rating: Float!) : String!
        makeAreaBuilding(username: String!, id: String!, title: String!, architecture: String!, cords: ICord!, photo: String!) : String!
        createProduct(username: String!, id: String!, title: String!, category: String!, level: String!, country: String!, status: String!, image: String!) : String!
        getProduct(shortid: String!) : Product!
        makeProductReview(username: String!, id: String!, text: String!, criterion: String!, rating: Float!, dateUp: String!) : String!
        updateProductInfo(username: String!, id: String!, status: String!, image: String!) : String!
        manageProductOffer(username: String!, id: String!, option: String!, marketplace: String!, cost: Float!, cords: ICord!, coll_id: String!) : String!
        createCleaning(username: String!, id: String!, title: String!, category: String!, level: String!, dateUp: String!, time: String!, region: String!, cords: ICord!, dots: [ICord]!, distance: Float!, discussion: String!, subject: String!) : String!
        getCleaning(shortid: String!) : Cleaning!
        manageCleaningStatus(username: String!, id: String!, option: String!, subject: String!) : String!
        updateCleaningInfo(username: String!, id: String!, discussion: String!) : String!
        makeCleaningResult(username: String!, id: String!, text: String!, category: String!, volume: Float!, image: String!) : String!
    }
`

const resolvers = {
    Query: {
        getProfiles: async () => {
            const profiles = await Profiles.find() 

            return profiles
        },
        getAreas: async () => {
            const areas = await Areas.find()

            return areas
        },
        getProducts: async () => {
            const products = await Products.find()

            return products
        },
        getCleanings: async () => {
            const cleanings = await Cleanings.find()

            return cleanings
        }
    },
    Mutation: {
        createProfile: async (_, {username, password, telegram, timestamp, radius, region, cords, main_photo}) => {
            const profile = await Profiles.findOne({username}) 
            let drop_object = {account_id: '', username}

            if (profile === null) {

                let account_id = get_id()

                const newProfile = new Profiles({
                    account_id,
                    username,
                    password,
                    telegram,
                    timestamp,
                    radius,
                    region,
                    cords,
                    main_photo,
                    account_components: []
                })

                drop_object = {account_id, username}
                
                await newProfile.save()
            } 
        
            return drop_object
        },
        loginProfile: async (_, {password}) => {
            const profile = await Profiles.findOne({password}) 
            let drop_object = {account_id: '', username: ''}
           
            if (profile) {  
                drop_object = {account_id: profile.account_id, username: profile.username}                       
            }

            return drop_object
        },
        getProfile: async (_, {account_id}) => {
            const profile = await Profiles.findOne({account_id}) 
            
            return profile
        },
        updateProfilePersonalInfo: async (_, {account_id, main_photo}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {
        
                profile.main_photo = main_photo

                await Profiles.updateOne({account_id}, {$set: profile})

                return PERSONAL_INFO_SUCCESS
            }

            return PERSONAL_INFO_FALL
        },
        updateProfileGeoInfo: async (_, {account_id, region, cords}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {

                profile.region = region
                profile.cords = cords
             
                await Profiles.updateOne({account_id}, {$set: profile})

                return GEO_INFO_SUCCESS
            }

            return GEO_INFO_FALL
        },
        updateProfileCommonInfo: async (_, {account_id, timestamp, radius}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {

                profile.timestamp = timestamp
                profile.radius = radius
              
                await Profiles.updateOne({account_id}, {$set: profile})

                return COMMON_INFO_SUCCESS
            }

            return COMMON_INFO_FALL
        },
        updateProfilePassword: async (_, {account_id, password}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {

                profile.password = password

                await Profiles.updateOne({account_id}, {$set: profile})

                return PASSWORD_SUCCESS
            }

            return PASSWORD_FALL
        },
        manageProfileService: async (_, {account_id, option, title, category, level, cost, image, coll_id}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {

                let feedback = ''

                if (option === 'create') {

                    let shortid = get_id()

                    profile.services = [...profile.services, {
                        shortid,
                        title,
                        category,
                        level,
                        cost,
                        image,
                        likes: 0
                    }]

                    profile.services = slicer(profile.services, 40)

                    feedback = SERVICE_CREATED

                } else if (option === 'delete') {

                    profile.services = profile.services.filter(el => el.shortid !== coll_id)

                    feedback = SERVICE_DELETED

                } else {

                    profile.services.map(el => {
                        if (el.shortid === coll_id) {
                            if (option === 'like') {
                                el.likes += 1

                                feedback = SERVICE_LIKED

                            } else if (option === 'update') {
                                el.level = level
                                el.image = image

                                feedback = SERVICE_UPDATED
                            }
                        }
                    })
                }

                await Profiles.updateOne({account_id}, {$set: profile})

                return feedback
            }

            return SERVICE_FALL
        },
        createArea: async (_, {username, id, title, category, format, region, cords, rating}) => {
            const profile = await Profiles.findOne({username, account_id: id}) 
            const area = await Areas.findOne({username, title, category, format, region, cords}) 
        
            if (profile && !area) {
                if (profile.account_components.filter(el => el.path === 'area').find(el => el.title === title) === undefined) {

                    let shortid = get_id()

                    profile.account_components = [...profile.account_components, {
                        shortid,
                        title,
                        path: 'area'
                    }]

                    const newArea = new Areas({
                        shortid,
                        username: profile.username,
                        title,
                        category,
                        format,
                        region,
                        cords,
                        rating,
                        needs: [],
                        buildings: []
                    })

                    await Profiles.updateOne({username, account_id: id}, {$set: profile})
                    await newArea.save()

                    return AREA_CREATED
                }
            }

            return AREA_FALL
        },
        getArea: async (_, {shortid}) => {
            const area = await Areas.findOne({shortid})

            return area
        },
        manageAreaNeed: async (_, {username, id, option, text, category, cost, coll_id}) => {
            const profile = await Profiles.findOne({username})
            const area = await Areas.findOne({shortid: id})

            if (profile && area) {

                let feedback = ''

                if (option === 'create') {

                    let shortid = get_id()

                    area.needs = [...area.needs, {
                        shortid,
                        name: profile.username,
                        text,
                        category,
                        cost,
                        supports: 0
                    }]

                    area.needs = slicer(area.needs, 40)

                    feedback = AREA_NEED_CREATED

                } else if (option === 'support') {

                    area.needs.map(el => {
                        if (el.shortid === coll_id) {
                            el.supports += 1
                        }
                    })

                    feedback = AREA_NEED_SUPPORTED

                } else {

                    area.needs = area.needs.filter(el => el.shortid !== coll_id)

                    feedback = AREA_NEED_DELETED
                }

                await Areas.updateOne({shortid: id}, {$set: area})

                return feedback
            }

            return AREA_NEED_FALL
        },
        updateAreaInfo: async (_, {username, id, rating}) => {
            const profile = await Profiles.findOne({username})
            const area = await Areas.findOne({shortid: id})

            if (profile && area) {

                area.rating = rating

                await Areas.updateOne({shortid: id}, {$set: area})

                return AREA_UPDATED_SUCCESS
            }

            return AREA_UPDATED_FALL
        },
        makeAreaBuilding: async (_, {username, id, title, architecture, cords, photo}) => {
            const profile = await Profiles.findOne({username})
            const area = await Areas.findOne({shortid: id})

            if (profile && area) {

                let shortid = get_id()

                area.buildings = [...area.buildings, {
                    shortid,
                    name: profile.username,
                    title,
                    architecture,
                    cords,
                    photo
                }]

                area.buildings = slicer(area.buildings, 40)

                await Areas.updateOne({shortid: id}, {$set: area})

                return AREA_BUILDING_CREATED
            }

            return AREA_BUILDING_FALL
        },
        createProduct: async (_, {username, id, title, category, level, country, status, image}) => {
            const profile = await Profiles.findOne({username, account_id: id})
            const product = await Products.findOne({title, category, level, country, status})
        
            if (profile && !product) {
                if (profile.account_components.filter(el => el.path === 'product').find(el => el.title === title) === undefined) {

                    let shortid = get_id()

                    profile.account_components = [...profile.account_components, {
                        shortid,
                        title,
                        path: 'product'
                    }]

                    const newProduct = new Products({
                        shortid,
                        username: profile.username,
                        title,
                        category,
                        level,
                        country,
                        status,
                        image,
                        reviews: [],
                        offers: []
                    })
                    
                    await Profiles.updateOne({username, account_id: id}, {$set: profile})
                    await newProduct.save()

                    return PRODUCT_CREATED_SUCCESS
                }
            }

            return PRODUCT_CREATED_FALL
        },
        getProduct: async (_, {shortid}) => {
            const product = await Products.findOne({shortid})

            return product
        },
        makeProductReview: async (_, {username, id, text, criterion, rating, dateUp}) => {
            const profile = await Profiles.findOne({username})
            const product = await Products.findOne({shortid: id})
        
            if (profile && product) {
                
                let shortid = get_id()

                product.reviews = [...product.reviews, {
                    shortid,
                    name: profile.username,
                    text,
                    criterion,
                    rating, 
                    dateUp
                }]

                product.reviews = slicer(product.reviews, 40)

                await Products.updateOne({shortid: id}, {$set: product})

                return PRODUCT_REVIEW_CREATED
            }
        
            return PRODUCT_REVIEW_FALL
        },
        updateProductInfo: async (_, {username, id, status, image}) => {
            const profile = await Profiles.findOne({username})
            const product = await Products.findOne({shortid: id})
        
            if (profile && product) {

                product.status = status
                product.image = image

                await Products.updateOne({shortid: id}, {$set: product})

                return PRODUCT_INFO_UPDATED
            }

            return PRODUCT_INFO_FALL
        },
        manageProductOffer: async (_, {username, id, option, marketplace, cost, cords, coll_id}) => {
            const profile = await Profiles.findOne({username})
            const product = await Products.findOne({shortid: id})
        
            if (profile && product) {
                
                let feedback = ''

                if (option === 'create') {

                    let shortid = get_id()

                    product.offers = [...product.offers, {
                        shortid,
                        name: profile.username,
                        marketplace,
                        cost,
                        cords,
                        likes: 0
                    }]

                    product.offers = slicer(product.offers, 40)

                    feedback = PRODUCT_OFFER_CREATED

                } else if (option === 'like') {

                    product.offers.map(el => {
                        if (el.shortid === coll_id) {
                            el.likes += 1
                        }
                    })

                    feedback = PRODUCT_OFFER_LIKED

                } else {
                    
                    product.offers = product.offers.filter(el => el.shortid !== coll_id)

                    feedback = PRODUCT_OFFER_DELETED
                }

                await Products.updateOne({shortid: id}, {$set: product})

                return feedback
            }

            return PRODUCT_OFFER_FALL
        },
        createCleaning: async (_, {username, id, title, category, level, dateUp, time, region, cords, dots, distance, discussion, subject}) => {
            const profile = await Profiles.findOne({username, account_id: id})
            const cleaning = await Cleanings.findOne({title, category, level, dateUp, time, region, cords, dots, distance})

            if (profile && !cleaning) {
                if (profile.account_components.filter(el => el.path === 'cleaning').find(el => el.title === title) === undefined) {

                    let shortid = get_id()

                    profile.account_components = [...profile.account_components, {
                        shortid,
                        title,
                        path: 'cleaning'
                    }]

                    const newCleaning = new Cleanings({
                        shortid,
                        username: profile.username,
                        title,
                        category,
                        level,
                        dateUp,
                        time,
                        region,
                        cords,
                        dots,
                        distance,
                        discussion,
                        members: [{
                            account_id: profile.account_id,
                            username: profile.username,
                            subject
                        }],
                        results: []
                    })

                    await Profiles.updateOne({username, account_id: id}, {$set: profile})
                    await newCleaning.save()

                    return CLEANING_CREATED_SUCCESS
                }
            }

            return CLEANING_CREATED_FALL
        },
        getCleaning: async (_, {shortid}) => {
            const cleaning = await Cleanings.findOne({shortid})

            return cleaning
        },
        manageCleaningStatus: async (_, {username, id, option, subject}) => {
            const profile = await Profiles.findOne({username})
            const cleaning = await Cleanings.findOne({shortid: id})

            if (profile && cleaning) {
                
                let feedback = ''

                if (option === 'join') {

                    profile.account_components = [...profile.account_components, {
                        shortid: cleaning.shortid,
                        title: cleaning.title,
                        path: 'cleaning'
                    }]

                    cleaning.members = [...cleaning.members, {
                        account_id: profile.account_id,
                        username: profile.username,
                        subject
                    }]

                    feedback = CLEANING_MEMBER_JOINED

                } else if (option === 'update') {

                    cleaning.members.map(el => {
                        if (el.account_id === profile.account_id) {
                            el.subject = subject
                        }
                    })

                    feedback = CLEANING_MEMBER_UPDATED

                } else {

                    profile.account_components = profile.account_components.filter(el => el.shortid !== cleaning.shortid)

                    cleaning.members = cleaning.members.filter(el => el.account_id !== profile.account_id)

                    feedback = CLEANING_MEMBER_EXIT
                }

                await Profiles.updateOne({username}, {$set: profile})
                await Cleanings.updateOne({shortid: id}, {$set: cleaning})

                return feedback
            }

            return CLEANING_MEMBER_FALL
        },
        updateCleaningInfo: async (_, {username, id, discussion}) => {
            const profile = await Profiles.findOne({username})
            const cleaning = await Cleanings.findOne({shortid: id})

            if (profile && cleaning) {

                cleaning.discussion = discussion

                await Cleanings.updateOne({shortid: id}, {$set: cleaning})

                return CLEANING_DISCUSSION_UPDATED
            }

            return CLEANING_DISCUSSION_FALL
        },
        makeCleaningResult: async (_, {username, id, text, category, volume, image}) => {
            const profile = await Profiles.findOne({username})
            const cleaning = await Cleanings.findOne({shortid: id})

            if (profile && cleaning) {

                let shortid = get_id()

                cleaning.results = [...cleaning.results, {
                    shortid,
                    name: profile.username,
                    text,
                    category,
                    volume,
                    image
                }]

                cleaning.results = slicer(cleaning.results, 40)
            
                await Cleanings.updateOne({shortid: id}, {$set: cleaning})

                return CLEANING_RESULT_CREATED
            }

            return CLEANING_RESULT_FALL
        }
    



    }
}

apollo_start(typeDefs, resolvers, app)

app.get('/towns', async (req, res) => {
    res.send(towns)
})

app.post('/register', async (req, res) => {
    let user = {
        account_id: get_id(),
        name: req.body.name
    }

    jwt.sign({user: user}, 'landworry.ru', (err, token) => {
        res.json({token: token})
    })
   
})

app.post('/verify', async (req, res) => {
    jwt.verify(req.body.token, 'landworry.ru', (err, data) => {
        res.json(data)
    })
})

app.listen(PORT, () => console.log(`Server started on ${PORT} port`))