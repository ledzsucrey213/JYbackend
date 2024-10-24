// tests/gameLabelController.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app'); // Assurez-vous que cela pointe vers votre application Express
const GameLabel = require('../Models/game_label');
const User = require('../Models/user'); // Modèle User à importer
const Event = require('../Models/event');

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

describe('Game Label Controller', () => {
    
    // Test de création d'une étiquette de jeu
    it('should create a new game label', async () => {
        const user = await User.create({ name: 'Alice', email: 'alice@example.com', phone: '1234567890' });
        const event = await Event.create({ name: 'Game Fest', start: new Date(), end: new Date(), is_active: true, commission: 5 });

        const gameLabelData = {
            seller_id: user._id,
            price: 50,
            event_id: event._id,
            condition: 'new',
            deposit_fee: 10,
            is_Sold: false,
            is_On_Sale: true,
        };

        const res = await request(app).post('/game-labels').send(gameLabelData);

        expect(res.statusCode).toBe(201);
        expect(res.body.price).toBe(50);
        expect(res.body.condition).toBe('new');
    });

    // Test pour obtenir toutes les étiquettes de jeu
    it('should return all game labels', async () => {
        const res = await request(app).get('/game-labels');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    // Test pour obtenir une étiquette de jeu par ID
    it('should return a game label by ID', async () => {
        const user = await User.create({ name: 'Bob', email: 'bob@example.com', phone: '0987654321' });
        const event = await Event.create({ name: 'Board Game Expo', start: new Date(), end: new Date(), is_active: true, commission: 10 });

        const gameLabel = await GameLabel.create({
            seller_id: user._id,
            price: 70,
            event_id: event._id,
            condition: 'very good',
            deposit_fee: 15,
            is_Sold: false,
            is_On_Sale: true,
        });

        const res = await request(app).get(`/game-labels/${gameLabel._id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(gameLabel._id.toString());
    });

    // Test pour mettre à jour une étiquette de jeu
    it('should update a game label', async () => {
        const user = await User.create({ name: 'Charlie', email: 'charlie@example.com', phone: '1122334455' });
        const event = await Event.create({ name: 'Game Night', start: new Date(), end: new Date(), is_active: true, commission: 20 });

        const gameLabel = await GameLabel.create({
            seller_id: user._id,
            price: 90,
            event_id: event._id,
            condition: 'good',
            deposit_fee: 5,
            is_Sold: false,
            is_On_Sale: true,
        });

        const updatedData = { price: 100 };

        const res = await request(app).put(`/game-labels/${gameLabel._id}`).send(updatedData);

        expect(res.statusCode).toBe(200);
        expect(res.body.price).toBe(100);
    });

    // Test pour supprimer une étiquette de jeu
    it('should delete a game label', async () => {
        const user = await User.create({ name: 'David', email: 'david@example.com', phone: '2233445566' });
        const event = await Event.create({ name: 'Annual Game Festival', start: new Date(), end: new Date(), is_active: true, commission: 15 });

        const gameLabel = await GameLabel.create({
            seller_id: user._id,
            price: 80,
            event_id: event._id,
            condition: 'poor',
            deposit_fee: 12,
            is_Sold: true,
            is_On_Sale: false,
        });

        const res = await request(app).delete(`/game-labels/${gameLabel._id}`);

        expect(res.statusCode).toBe(204);
    });

    // Test pour obtenir les étiquettes de jeu par vendeur
    it('should return game labels by seller', async () => {
        const user = await User.create({ name: 'Eve', email: 'eve@example.com', phone: '5566778899' });
        const event = await Event.create({ name: 'Game Show', start: new Date(), end: new Date(), is_active: true, commission: 10 });

        await GameLabel.create({
            seller_id: user._id,
            price: 60,
            event_id: event._id,
            condition: 'new',
            deposit_fee: 20,
            is_Sold: false,
            is_On_Sale: true,
        });

        const res = await request(app).get(`/game-labels/seller/${user._id}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    // Test pour obtenir les étiquettes de jeu par vendeur qui ne sont pas à vendre
    it('should return game labels by seller that are not on sale', async () => {
        const user = await User.create({ name: 'Frank', email: 'frank@example.com', phone: '3344556677' });
        const event = await Event.create({ name: 'Tabletop Game Expo', start: new Date(), end: new Date(), is_active: true, commission: 12 });

        await GameLabel.create({
            seller_id: user._id,
            price: 40,
            event_id: event._id,
            condition: 'very good',
            deposit_fee: 8,
            is_Sold: true,
            is_On_Sale: false,
        });

        const res = await request(app).get(`/game-labels/seller/${user._id}/is_On_Sale=false`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBe(1); // S'assurer qu'il y a une étiquette qui ne soit pas à vendre
    });
});
/*Explication des tests :
Création d'une étiquette de jeu : Vérifie si une nouvelle étiquette de jeu peut être créée avec les bonnes données.
Obtenir toutes les étiquettes de jeu : Vérifie que toutes les étiquettes de jeu sont retournées.
Obtenir une étiquette de jeu par ID : Vérifie si une étiquette de jeu peut être récupérée par son ID.
Mettre à jour une étiquette de jeu : Vérifie si une étiquette de jeu peut être mise à jour correctement.
Supprimer une étiquette de jeu : Vérifie si une étiquette de jeu peut être supprimée avec succès.
Obtenir des étiquettes de jeu par vendeur : Vérifie que les étiquettes de jeu d'un vendeur spécifique sont retournées.
Obtenir des étiquettes de jeu par vendeur qui ne sont pas à vendre : Vérifie que les étiquettes de jeu d'un vendeur qui ne sont pas à vendre sont correctement récupérées. */