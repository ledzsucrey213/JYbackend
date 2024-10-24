const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app'); // Assurez-vous que cela pointe vers votre application Express
const Stock = require('../Models/stock');
const GameLabel = require('../Models/game_label'); // Modèle pour la référence games_id
const User = require('../Models/user'); // Modèle pour la référence seller_id

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Stock Controller', () => {

    // Test de création de stock
    it('should create a new stock', async () => {
        const user = new User({ name: 'Alice', email: 'alice@example.com' });
        await user.save();

        const gameLabel = new GameLabel({
            seller_id: user._id,
            price: 30,
            event_id: new mongoose.Types.ObjectId(),
            condition: 'new',
            deposit_fee: 5,
            is_Sold: false,
        });
        await gameLabel.save();

        const stockData = {
            games_id: [gameLabel._id],
            seller_id: user._id,
            games_sold: []
        };

        const res = await request(app).post('/stocks').send(stockData);
        expect(res.statusCode).toBe(201);
        expect(res.body.seller_id).toBe(stockData.seller_id.toString());
    });

    // Test pour obtenir tous les stocks
    it('should return all stocks', async () => {
        const res = await request(app).get('/stocks');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    // Test pour obtenir un stock par ID
    it('should return a stock by ID', async () => {
        const user = new User({ name: 'Bob', email: 'bob@example.com' });
        await user.save();

        const gameLabel = new GameLabel({
            seller_id: user._id,
            price: 40,
            event_id: new mongoose.Types.ObjectId(),
            condition: 'used',
            deposit_fee: 5,
            is_Sold: false,
        });
        await gameLabel.save();

        const stock = new Stock({
            games_id: [gameLabel._id],
            seller_id: user._id,
            games_sold: []
        });
        await stock.save();

        const res = await request(app).get(`/stocks/${stock._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.seller_id).toBe(stock.seller_id.toString());
    });

    // Test pour mettre à jour un stock
    it('should update a stock', async () => {
        const user = new User({ name: 'Charlie', email: 'charlie@example.com' });
        await user.save();

        const gameLabel = new GameLabel({
            seller_id: user._id,
            price: 50,
            event_id: new mongoose.Types.ObjectId(),
            condition: 'new',
            deposit_fee: 5,
            is_Sold: false,
        });
        await gameLabel.save();

        const stock = new Stock({
            games_id: [gameLabel._id],
            seller_id: user._id,
            games_sold: []
        });
        await stock.save();

        const updatedData = { games_sold: [gameLabel._id] };

        const res = await request(app).put(`/stocks/${stock._id}`).send(updatedData);
        expect(res.statusCode).toBe(200);
        expect(res.body.games_sold).toContain(gameLabel._id.toString());
    });

    // Test pour supprimer un stock
    it('should delete a stock', async () => {
        const user = new User({ name: 'Diana', email: 'diana@example.com' });
        await user.save();

        const gameLabel = new GameLabel({
            seller_id: user._id,
            price: 60,
            event_id: new mongoose.Types.ObjectId(),
            condition: 'new',
            deposit_fee: 5,
            is_Sold: false,
        });
        await gameLabel.save();

        const stock = new Stock({
            games_id: [gameLabel._id],
            seller_id: user._id,
            games_sold: []
        });
        await stock.save();

        const res = await request(app).delete(`/stocks/${stock._id}`);
        expect(res.statusCode).toBe(204);
    });

    // Test pour obtenir les stocks par seller_id
    it('should return stocks by seller ID', async () => {
        const user = new User({ name: 'Eve', email: 'eve@example.com' });
        await user.save();

        const gameLabel1 = new GameLabel({
            seller_id: user._id,
            price: 70,
            event_id: new mongoose.Types.ObjectId(),
            condition: 'new',
            deposit_fee: 5,
            is_Sold: false,
        });
        const gameLabel2 = new GameLabel({
            seller_id: user._id,
            price: 80,
            event_id: new mongoose.Types.ObjectId(),
            condition: 'used',
            deposit_fee: 5,
            is_Sold: false,
        });
        await gameLabel1.save();
        await gameLabel2.save();

        const stock1 = new Stock({
            games_id: [gameLabel1._id],
            seller_id: user._id,
            games_sold: []
        });
        const stock2 = new Stock({
            games_id: [gameLabel2._id],
            seller_id: user._id,
            games_sold: []
        });
        await stock1.save();
        await stock2.save();

        const res = await request(app).get(`/stocks/seller/${user._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(2); // Vérifie qu'il y a 2 stocks pour cet utilisateur
    });
});
/*Explication des Tests
Configuration de la base de données :

beforeAll : Crée une instance de MongoMemoryServer pour avoir une base de données temporaire en mémoire, à laquelle Mongoose se connecte avant l'exécution des tests.
afterAll : Déconnecte Mongoose et arrête le serveur MongoDB après l'exécution des tests.
Test de création de stock :

Test : Vérifie que la création d'un nouveau stock fonctionne en envoyant des données valides. Il crée également un utilisateur et un GameLabel pour respecter les références.
Assertions : Vérifie que le statut de la réponse est 201 (Créé) et que l'ID du vendeur correspond à celui envoyé.
Test pour obtenir tous les stocks :

Test : Vérifie que l'API retourne tous les stocks existants.
Assertions : Vérifie que le statut est 200 (OK) et que le corps de la réponse est un tableau.
Test pour obtenir un stock par ID :

Test : Crée un stock, puis vérifie que l'API retourne les détails de ce stock en utilisant son ID.
Assertions : Vérifie que le statut est 200 (OK) et que l'ID du vendeur correspond à celui du stock créé.
Test pour mettre à jour un stock :

Test : Crée un stock, le met à jour avec de nouvelles données (ajout d'un jeu vendu) et vérifie que l'API retourne les informations mises à jour.
Assertions : Vérifie que le statut est 200 (OK) et que les jeux vendus incluent le jeu ajouté.
Test pour supprimer un stock :

Test : Crée un stock, le supprime et vérifie que l'API retourne un statut 204 (Pas de contenu) après la suppression.
Assertions : Vérifie que le statut est 204, ce qui signifie que la suppression a été réussie.
Test pour obtenir les stocks par seller_id :

Test : Crée plusieurs stocks pour un même vendeur et vérifie que l'API retourne tous les stocks associés à cet utilisateur.
Assertions : Vérifie que le statut est 200 (OK) et que le nombre de stocks retournés est correct. */