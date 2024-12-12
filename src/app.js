// dependencies importation
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

//Routes imports
const userRoutes = require('./Routes/userRoutes');
const invoiceRoutes = require('./Routes/invoiceRoutes');
const stockRoutes = require('./Routes/stockRoutes');
const saleRoutes = require('./Routes/saleRoutes');
const gameRoutes = require('./Routes/gameRoutes');
const game_labelRoutes = require('./Routes/game_labelRoutes');
const financial_reportRoutes = require('./Routes/financial_reportRoutes');
const eventRoutes = require('./Routes/eventRoutes');

const app = express();

// Middleware CORS pour gérer les credentials et autoriser Angular
app.use(cors({
    origin: 'http://localhost:4200', // Autorise uniquement votre frontend Angular
    credentials: true, // Permet d'envoyer les cookies
}));

// Middleware pour gérer les requêtes préliminaires
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200'); // Frontend Angular
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS'); // Méthodes HTTP autorisées
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization'); // En-têtes autorisés
    res.header('Access-Control-Allow-Credentials', 'true'); // Permet les cookies et credentials

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(express.json());
app.use(cookieParser());

// Start the app
app.get('/', (req, res) => {
    res.send('Projet dépôt de vente Jalil et Yanis');
});

// Check if URL MONGO_URI is defined to access to database
if (!process.env.MONGO_URI) {
    console.error("MONGOURL must be defined");
    process.exit(1);
}

// MongoDB database connection with mongoose
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
app.use('/api/user', userRoutes);
app.use('/api/invoice', invoiceRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/sale', saleRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/game_label', game_labelRoutes);
app.use('/api/report', financial_reportRoutes);
app.use('/api/event', eventRoutes);
