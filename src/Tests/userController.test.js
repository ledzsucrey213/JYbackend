const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app'); // Assurez-vous que votre fichier d'application exporte l'application Express
const User = require('../Models/user');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('User Controller', () => {
    let userId;

    beforeEach(async () => {
        const user = new User({ name: 'Test User', role: 'admin', password: '123456' });
        userId = (await user.save())._id;
    });

    test('should get all users', async () => {
        const response = await request(app).get('/api/users');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('should get a user by ID', async () => {
        const response = await request(app).get(`/api/users/${userId}`);
        
        expect(response.status).toBe(200);
        expect(response.body._id).toBe(userId.toString());
    });

    test('should update a user', async () => {
        const response = await request(app)
            .put(`/api/users/${userId}`)
            .send({ name: 'Updated User' });
        
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Updated User');
    });

    test('should delete a user', async () => {
        const response = await request(app).delete(`/api/users/${userId}`);
        
        expect(response.status).toBe(204);
    });

    test('should create a user', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({ name: 'New User', role: 'manager', password: 'password123' });
        
        expect(response.status).toBe(201);
        expect(response.body.name).toBe('New User');
    });

    test('should get users by role', async () => {
        const response = await request(app).get(`/api/users/role/admin`);
        
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1); // Assuming we have only one admin
    });
});
/*Explications des tests pour userController
Configuration de la base de données :
Comme pour les tests de stockController, nous utilisons MongoMemoryServer pour une base de données en mémoire.
Tests des fonctionnalités :
Obtention de tous les utilisateurs : Vérifie que l'API retourne tous les utilisateurs existants. Le statut doit être 200.
Obtention d'un utilisateur par ID : Vérifie que l'API retourne les détails d'un utilisateur en utilisant son ID. Le statut doit être 200.
Mise à jour d'un utilisateur : Met à jour un utilisateur et vérifie que les informations retournées sont correctes. Le statut doit être 200.
Suppression d'un utilisateur : Supprime un utilisateur et vérifie que l'API retourne un statut 204.
Création d'un utilisateur : Vérifie que la création d'un nouvel utilisateur fonctionne avec des données valides. Le statut doit être 201.
Obtention des utilisateurs par rôle : Vérifie que l'API retourne les utilisateurs par rôle. Le statut doit être 200 */