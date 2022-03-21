import mongoose from "mongoose";

export function connectMongoose(uri) {

    mongoose.connect(uri, err => {
        if (err) console.log(err)
        console.log('Connected to DB..');
    });

  
}