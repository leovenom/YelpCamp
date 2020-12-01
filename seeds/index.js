const mongoose = require('mongoose');
const cities = require('./cities')
const {places, descriptors} = require ('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for(let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000)
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      //YOUR USER ID
      author: '5fbfc085aa820328ed93e259',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      // image: 'https://source.unsplash.com/collection/483251',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid, asperiores esse libero eligendi est beatae odio enim magnam tempora nisi nulla unde veniam eveniet ipsum alias, aut ex, dignissimos maxime!',
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude
        ]
      },
      images:[
        {
          url: 'https://res.cloudinary.com/dmvgmogaf/image/upload/v1606506069/YelpCamp/gc0nhbtj1yrg4cjiroe6.jpg',
          filename: 'YelpCamp/gc0nhbtj1yrg4cjiroe6'
        },
        {
          url: 'https://res.cloudinary.com/dmvgmogaf/image/upload/v1606506069/YelpCamp/xrgic5k4cvjnuim4bpuw.jpg',
          filename: 'YelpCamp/xrgic5k4cvjnuim4bpuw'
        }
      ]
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close()
});