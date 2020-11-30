const { string } = require('joi');
const mongoose = require('mongoose');
const Review = require('./review')
const Schema = mongoose.Schema;

const  imagesSchema  = new Schema({
    url: String,
    filename: String
});

imagesSchema.virtual('thumbnail').get(function(){
   return this.url.replace('/upload', '/upload/w_200');
})

const CampgroundSchema = new Schema({
    title: String,
    images: [imagesSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            require: true
        },
        coordinates: {
            type: [Number],
            require: true
        }
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc){
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema);