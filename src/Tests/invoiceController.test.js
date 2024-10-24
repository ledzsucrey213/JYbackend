const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app'); // Assurez-vous que cela pointe vers l'application Express
const Invoice = require('../Models/invoice');

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

describe('Invoice Controller', () => {

    // Test de création de facture
    it('should create a new invoice', async () => {
        const invoiceData = {
            sale_id: new mongoose.Types.ObjectId(),
            buyer_id: new mongoose.Types.ObjectId()
        };

        const res = await request(app).post('/invoices').send(invoiceData);
        expect(res.statusCode).toBe(201);
        expect(res.body.sale_id).toBe(invoiceData.sale_id.toString());
        expect(res.body.buyer_id).toBe(invoiceData.buyer_id.toString());
    });

    // Test pour obtenir toutes les factures
    it('should return all invoices', async () => {
        const invoice1 = new Invoice({
            sale_id: new mongoose.Types.ObjectId(),
            buyer_id: new mongoose.Types.ObjectId()
        });

        const invoice2 = new Invoice({
            sale_id: new mongoose.Types.ObjectId(),
            buyer_id: new mongoose.Types.ObjectId()
        });

        await invoice1.save();
        await invoice2.save();

        const res = await request(app).get('/invoices');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(2);
    });

    // Test pour obtenir une facture par ID
    it('should return an invoice by ID', async () => {
        const invoice = new Invoice({
            sale_id: new mongoose.Types.ObjectId(),
            buyer_id: new mongoose.Types.ObjectId()
        });
        await invoice.save();

        const res = await request(app).get(`/invoices/${invoice._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.sale_id).toBe(invoice.sale_id.toString());
        expect(res.body.buyer_id).toBe(invoice.buyer_id.toString());
    });

    // Test pour mettre à jour une facture
    it('should update an invoice', async () => {
        const invoice = new Invoice({
            sale_id: new mongoose.Types.ObjectId(),
            buyer_id: new mongoose.Types.ObjectId()
        });
        await invoice.save();

        const updatedData = { sale_id: new mongoose.Types.ObjectId() };

        const res = await request(app).put(`/invoices/${invoice._id}`).send(updatedData);
        expect(res.statusCode).toBe(200);
        expect(res.body.sale_id).toBe(updatedData.sale_id.toString());
    });

    // Test pour supprimer une facture
    it('should delete an invoice', async () => {
        const invoice = new Invoice({
            sale_id: new mongoose.Types.ObjectId(),
            buyer_id: new mongoose.Types.ObjectId()
        });
        await invoice.save();

        const res = await request(app).delete(`/invoices/${invoice._id}`);
        expect(res.statusCode).toBe(204);
    });

    // Test pour obtenir des factures par ID d'acheteur
    it('should return invoices by buyer ID', async () => {
        const buyerId = new mongoose.Types.ObjectId();
        const invoice1 = new Invoice({
            sale_id: new mongoose.Types.ObjectId(),
            buyer_id: buyerId
        });

        const invoice2 = new Invoice({
            sale_id: new mongoose.Types.ObjectId(),
            buyer_id: buyerId
        });

        await invoice1.save();
        await invoice2.save();

        const res = await request(app).get(`/invoices/buyer/${buyerId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(2);
    });
});
/*Explication des Tests
Configuration de la base de données :

beforeAll : Avant l'exécution des tests, nous créons une instance de MongoMemoryServer et nous y connectons Mongoose. Cela permet de travailler avec une base de données en mémoire, ce qui est utile pour les tests.
afterAll : Après les tests, nous déconnectons Mongoose et arrêtons le serveur MongoDB.
Test de création de facture :

Test : Vérifie que la création d'une nouvelle facture fonctionne correctement en envoyant des données de facture valides.
Assertions : Vérifie que le statut de la réponse est 201 (Créé) et que les ID de vente et d'acheteur correspondent à ceux envoyés.
Test pour obtenir toutes les factures :

Test : Crée deux factures et vérifie que l'API retourne ces factures.
Assertions : Vérifie que le statut est 200 (OK) et que le nombre de factures retournées est de 2.
Test pour obtenir une facture par ID :

Test : Crée une facture, puis vérifie que l'API retourne les détails de cette facture en utilisant son ID.
Assertions : Vérifie que le statut est 200 (OK) et que les ID de vente et d'acheteur correspondent.
Test pour mettre à jour une facture :

Test : Crée une facture, la met à jour avec de nouvelles données et vérifie que l'API retourne les informations mises à jour.
Assertions : Vérifie que le statut est 200 (OK) et que l'ID de vente mis à jour est correct.
Test pour supprimer une facture :

Test : Crée une facture, la supprime et vérifie que l'API retourne un statut 204 (Pas de contenu) après la suppression.
Assertions : Vérifie que le statut est 204, ce qui signifie que la suppression a été réussie.
Test pour obtenir des factures par ID d'acheteur :

Test : Crée deux factures associées au même acheteur, puis vérifie que l'API retourne les factures pour cet acheteur.
Assertions : Vérifie que le statut est 200 (OK) et que le nombre de factures retournées est de 2. */