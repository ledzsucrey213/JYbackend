// tests/financial_reportController.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app'); // Assurez-vous que cela pointe vers l'application Express
const Report = require('../Models/financial_report');
const User = require('../Models/user'); // Modèle User à importer
const Event = require('../Models/event');
const Stock = require('../Models/stock');

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

describe('Financial Report Controller', () => {

    // Test de création de rapport financier
    it('should create a new report', async () => {
        const user = await User.create({ name: 'John Doe', email: 'johndoe@example.com', phone: '1234567890' });
        const event = await Event.create({ name: 'Game Event', start: new Date(), end: new Date(), is_active: true, commission: 10 });
        const stock = await Stock.create({ game_name: 'Catan', quantity: 5 });

        const reportData = {
            seller_id: user._id,
            total_earned: 100,
            total_due: 90,
            report_date: new Date(),
            event_id: event._id,
            stock_id: stock._id
        };

        const res = await request(app).post('/reports').send(reportData);

        expect(res.statusCode).toBe(201);
        expect(res.body.total_earned).toBe(100);
        expect(res.body.total_due).toBe(90);
    });

    // Test pour obtenir tous les rapports financiers
    it('should return all reports', async () => {
        const res = await request(app).get('/reports');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    // Test pour obtenir un rapport par ID
    it('should return a report by ID', async () => {
        const user = await User.create({ name: 'Jane Doe', email: 'janedoe@example.com', phone: '0987654321' });
        const event = await Event.create({ name: 'Another Event', start: new Date(), end: new Date(), is_active: true, commission: 15 });
        const stock = await Stock.create({ game_name: 'Monopoly', quantity: 3 });

        const report = await Report.create({
            seller_id: user._id,
            total_earned: 150,
            total_due: 130,
            report_date: new Date(),
            event_id: event._id,
            stock_id: stock._id
        });

        const res = await request(app).get(`/reports/${report._id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(report._id.toString());
    });

    // Test pour mettre à jour un rapport financier
    it('should update a report', async () => {
        const user = await User.create({ name: 'John Smith', email: 'johnsmith@example.com', phone: '1122334455' });
        const event = await Event.create({ name: 'Third Event', start: new Date(), end: new Date(), is_active: false, commission: 5 });
        const stock = await Stock.create({ game_name: 'Ticket to Ride', quantity: 7 });

        const report = await Report.create({
            seller_id: user._id,
            total_earned: 200,
            total_due: 180,
            report_date: new Date(),
            event_id: event._id,
            stock_id: stock._id
        });

        const updatedData = { total_earned: 220 };

        const res = await request(app).put(`/reports/${report._id}`).send(updatedData);

        expect(res.statusCode).toBe(200);
        expect(res.body.total_earned).toBe(220);
    });

    // Test pour supprimer un rapport financier
    it('should delete a report', async () => {
        const user = await User.create({ name: 'Jane Smith', email: 'janesmith@example.com', phone: '5566778899' });
        const event = await Event.create({ name: 'Final Event', start: new Date(), end: new Date(), is_active: true, commission: 12 });
        const stock = await Stock.create({ game_name: 'Pandemic', quantity: 2 });

        const report = await Report.create({
            seller_id: user._id,
            total_earned: 300,
            total_due: 270,
            report_date: new Date(),
            event_id: event._id,
            stock_id: stock._id
        });

        const res = await request(app).delete(`/reports/${report._id}`);

        expect(res.statusCode).toBe(204);
    });
});

/*Explication des tests :
- Test de création de rapport : Ce test envoie une requête POST pour créer un nouveau rapport financier. Il vérifie que la réponse est 201 et que les champs total_earned et total_due sont correctement définis.
- Test pour récupérer tous les rapports : Ce test envoie une requête GET pour obtenir tous les rapports, et il vérifie que la réponse est un tableau.
- Test pour obtenir un rapport par ID : Ce test crée un rapport, puis envoie une requête GET pour récupérer ce rapport spécifique par ID.
- Test de mise à jour d'un rapport : Ce test crée un rapport, puis envoie une requête PUT pour mettre à jour le montant total_earned. Il vérifie que le montant a été mis à jour avec succès.
- Test de suppression d'un rapport : Ce test crée un rapport, puis envoie une requête DELETE pour le supprimer. Il vérifie que la réponse est 204, indiquant une suppression réussie.
*/
