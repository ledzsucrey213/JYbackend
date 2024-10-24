const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app'); // Assurez-vous que cela pointe vers votre application Express
const Sale = require('../Models/sale');
const GameLabel = require('../Models/game_label'); // Modèle pour la référence games_id
const User = require('../Models/user'); // Modèle pour la référence buyer_id

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

describe('Sale Controller', () => {

    // Test de création de vente
    it('should create a new sale', async () => {
        const user = new User({ name: 'John Doe', email: 'john@example.com' });
        await user.save();

        const gameLabel = new GameLabel({
            seller_id: new mongoose.Types.ObjectId(),
            price: 20,
            event_id: new mongoose.Types.ObjectId(),
            condition: 'new',
            deposit_fee: 5,
            is_Sold: false,
        });
        await gameLabel.save();

        const saleData = {
            total_price: 25,
            games_id: [gameLabel._id],
            buyer_id: user._id,
            sale_date: new Date(),
            total_commission: 2.5,
            paid_with: 'cash'
        };

        const res = await request(app).post('/sales').send(saleData);
        expect(res.statusCode).toBe(201);
        expect(res.body.total_price).toBe(saleData.total_price);
        expect(res.body.buyer_id).toBe(saleData.buyer_id.toString());
    });

    // Test pour obtenir toutes les ventes
    it('should return all sales', async () => {
        const res = await request(app).get('/sales');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    // Test pour obtenir une vente par ID
    it('should return a sale by ID', async () => {
        const sale = new Sale({
            total_price: 30,
            games_id: [new mongoose.Types.ObjectId()],
            buyer_id: new mongoose.Types.ObjectId(),
            sale_date: new Date(),
            total_commission: 3,
            paid_with: 'card'
        });
        await sale.save();

        const res = await request(app).get(`/sales/${sale._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.total_price).toBe(sale.total_price);
    });

    // Test pour mettre à jour une vente
    it('should update a sale', async () => {
        const sale = new Sale({
            total_price: 40,
            games_id: [new mongoose.Types.ObjectId()],
            buyer_id: new mongoose.Types.ObjectId(),
            sale_date: new Date(),
            total_commission: 4,
            paid_with: 'card'
        });
        await sale.save();

        const updatedData = { total_price: 50 };

        const res = await request(app).put(`/sales/${sale._id}`).send(updatedData);
        expect(res.statusCode).toBe(200);
        expect(res.body.total_price).toBe(updatedData.total_price);
    });

    // Test pour supprimer une vente
    it('should delete a sale', async () => {
        const sale = new Sale({
            total_price: 60,
            games_id: [new mongoose.Types.ObjectId()],
            buyer_id: new mongoose.Types.ObjectId(),
            sale_date: new Date(),
            total_commission: 6,
            paid_with: 'cash'
        });
        await sale.save();

        const res = await request(app).delete(`/sales/${sale._id}`);
        expect(res.statusCode).toBe(204);
    });
});
/*Explication des Tests
Configuration de la base de données :

beforeAll : Avant l'exécution des tests, nous créons une instance de MongoMemoryServer et connectons Mongoose à cette instance. Cela permet de travailler avec une base de données en mémoire, idéale pour les tests.
afterAll : Après les tests, nous déconnectons Mongoose et arrêtons le serveur MongoDB.
Test de création de vente :

Test : Vérifie que la création d'une nouvelle vente fonctionne correctement en envoyant des données de vente valides. Pour cela, nous créons également un utilisateur et un GameLabel pour satisfaire les références.
Assertions : Vérifie que le statut de la réponse est 201 (Créé) et que le prix total et l'ID de l'acheteur correspondent à ceux envoyés.
Test pour obtenir toutes les ventes :

Test : Vérifie que l'API retourne toutes les ventes existantes.
Assertions : Vérifie que le statut est 200 (OK) et que le corps de la réponse est un tableau.
Test pour obtenir une vente par ID :

Test : Crée une vente, puis vérifie que l'API retourne les détails de cette vente en utilisant son ID.
Assertions : Vérifie que le statut est 200 (OK) et que le prix total correspond à celui de la vente créée.
Test pour mettre à jour une vente :

Test : Crée une vente, la met à jour avec de nouvelles données et vérifie que l'API retourne les informations mises à jour.
Assertions : Vérifie que le statut est 200 (OK) et que le prix total mis à jour est correct.
Test pour supprimer une vente :

Test : Crée une vente, la supprime et vérifie que l'API retourne un statut 204 (Pas de contenu) après la suppression.
Assertions : Vérifie que le statut est 204, ce qui signifie que la suppression a été réussie */