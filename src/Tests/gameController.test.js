const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app'); // Assurez-vous que cela pointe vers l'application Express
const Game = require('../Models/game');

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

describe('Game Controller', () => {

    // Test de création de jeu
    it('should create a new game', async () => {
        const gameData = {
            name: 'Catan',
            editor: 'Z-Man Games',
            description: 'A strategy board game about trading and building.'
        };

        const res = await request(app).post('/games').send(gameData);
        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe(gameData.name);
    });

    // Test pour obtenir tous les jeux
    it('should return all games', async () => {
        const game1 = new Game({
            name: 'Catan',
            editor: 'Z-Man Games',
            description: 'A strategy board game about trading and building.'
        });

        const game2 = new Game({
            name: 'Monopoly',
            editor: 'Hasbro',
            description: 'A classic board game about buying and trading properties.'
        });

        await game1.save();
        await game2.save();

        const res = await request(app).get('/games');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(2);
    });

    // Test pour obtenir un jeu par ID
    it('should return a game by ID', async () => {
        const game = new Game({
            name: 'Catan',
            editor: 'Z-Man Games',
            description: 'A strategy board game about trading and building.'
        });
        await game.save();

        const res = await request(app).get(`/games/${game._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe(game.name);
    });

    // Test pour mettre à jour un jeu
    it('should update a game', async () => {
        const game = new Game({
            name: 'Catan',
            editor: 'Z-Man Games',
            description: 'A strategy board game about trading and building.'
        });
        await game.save();

        const updatedData = { name: 'Catan: 3D Edition' };

        const res = await request(app).put(`/games/${game._id}`).send(updatedData);
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe(updatedData.name);
    });

    // Test pour supprimer un jeu
    it('should delete a game', async () => {
        const game = new Game({
            name: 'Catan',
            editor: 'Z-Man Games',
            description: 'A strategy board game about trading and building.'
        });
        await game.save();

        const res = await request(app).delete(`/games/${game._id}`);
        expect(res.statusCode).toBe(204);
    });
});
/*Explication des Tests
Configuration de la base de données :

beforeAll: Ce bloc est exécuté avant tous les tests. Il crée un serveur MongoDB en mémoire, établit une connexion à celui-ci et s'assure que tous les tests utilisent cette base de données temporaire.
afterAll: Ce bloc est exécuté après tous les tests pour déconnecter Mongoose et arrêter le serveur MongoDB.
Test de création de jeu :

Test : Vérifie que la création d'un nouveau jeu fonctionne correctement.
Assertion : S'assure que le statut de la réponse est 201 (Créé) et que le nom du jeu correspond à celui envoyé.
Test pour obtenir tous les jeux :

Test : Crée deux jeux et vérifie qu'ils sont correctement retournés par l'API.
Assertion : Vérifie que le statut est 200 (OK) et que la longueur du tableau des jeux retournés est de 2.
Test pour obtenir un jeu par ID :

Test : Crée un jeu et vérifie que l'API retourne les détails de ce jeu lorsqu'on fait une requête avec son ID.
Assertion : Vérifie que le statut est 200 (OK) et que le nom du jeu retourné correspond au nom attendu.
Test pour mettre à jour un jeu :

Test : Crée un jeu, met à jour son nom, et vérifie que l'API retourne les informations mises à jour.
Assertion : Vérifie que le statut est 200 (OK) et que le nom mis à jour est correct.
Test pour supprimer un jeu :

Test : Crée un jeu, le supprime, et vérifie que l'API retourne un statut de 204 (Pas de contenu) après la suppression.
Assertion : Vérifie que le statut est 204, ce qui signifie que la suppression a été réussie */