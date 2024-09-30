// dependencies importation
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();

app.use(cors());
app.use(express.json());

// start the app


app.get('/', (req, res) => {
    res.send('Projet dépôt de vente Jalil et Yanis');
});



// check if URL MONGO_URI is defined to access to database
if (!process.env.MONGO_URI) { 
    console.error("MONGOURL must be defined"); process.exit(1); 
}



// mongodb database connection with mongoose 
mongoose.connect(process.env.MONGO_URI) 
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('app is running on PORT', process.env.PORT);
        });
    }) 
    .catch((err) => {
        console.error('Could not connect to MongoDB...', err);
    });







