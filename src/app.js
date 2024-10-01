// dependencies importation
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

//Routes imports
const userRoutes = require('./Routes/userRoutes');
const transactionRoutes = require('./Routes/transactionRoutes');
const stockRoutes = require('./Routes/stockRoutes');
const saleRoutes = require('./Routes/saleRoutes');
const gameRoutes = require('./Routes/gameRoutes');
const game_labelRoutes = require('./Routes/game_labelRoutes');
const financial_reportRoutes = require('./Routes/financial_reportRoutes');
const eventRoutes = require('./Routes/eventRoutes')

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

// Routes uses 
app.use('/api', userRoutes);
app.use('/api', transactionRoutes);
app.use('/api', stockRoutes);
app.use('/api', saleRoutes);
app.use('/api', gameRoutes);
app.use('/api', game_labelRoutes);
app.use('/api', financial_reportRoutes);
app.use('/api', eventRoutes);



