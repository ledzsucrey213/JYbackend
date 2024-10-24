// tests/eventController.test.js
const request = require('supertest');
const app = require('../app');  // L'application express principale
const mongoose = require('mongoose');
const Event = require('../Models/event');

// Mock de l'événement avant chaque test
beforeEach(async () => {
  await Event.deleteMany();  // Nettoyer la collection avant chaque test
  const event = new Event({
    name: "Festival du Jeu",
    start: new Date(),
    end: new Date(),
    is_active: true,
    commission: 5
  });
  await event.save();
});

afterAll(async () => {
  // Nettoyer après les tests
  await mongoose.connection.close();
});

describe('Test des routes Event', () => {
  
  it('GET /api/events - Devrait retourner tous les événements', async () => {
    const res = await request(app).get('/api/events');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);  // Il doit y avoir au moins un événement
  });

  it('POST /api/events - Devrait créer un nouvel événement', async () => {
    const res = await request(app)
      .post('/api/events')
      .send({
        name: "Nouveau Festival",
        start: new Date(),
        end: new Date(),
        is_active: false,
        commission: 10
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toBe("Nouveau Festival");
  });

  it('GET /api/events/:id - Devrait retourner un événement par ID', async () => {
    const event = await Event.findOne();
    const res = await request(app).get(`/api/events/${event._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe("Festival du Jeu");
  });

  it('PUT /api/events/:id - Devrait mettre à jour un événement', async () => {
    const event = await Event.findOne();
    const res = await request(app)
      .put(`/api/events/${event._id}`)
      .send({ name: "Festival du Jeu Modifié" });
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe("Festival du Jeu Modifié");
  });

  it('DELETE /api/events/:id - Devrait supprimer un événement', async () => {
    const event = await Event.findOne();
    const res = await request(app).delete(`/api/events/${event._id}`);
    expect(res.statusCode).toEqual(204);
  });

  it('GET /api/events/isActive - Devrait retourner l\'événement actif', async () => {
    const res = await request(app).get('/api/events/isActive');
    expect(res.statusCode).toEqual(200);
    expect(res.body.is_active).toBe(true);
  });
});

/*Explication des tests :
beforeEach et afterAll : Ils permettent de nettoyer la base de données avant chaque test et de fermer la connexion une fois les tests terminés.

Test GET /api/events : Vérifie si tous les événements sont bien retournés.

Test POST /api/events : Vérifie si un nouvel événement est bien créé avec les bonnes informations.

Test GET /api/events/:id : Vérifie si un événement est retourné en fonction de son ID.

Test PUT /api/events/:id : Vérifie si un événement est bien mis à jour.

Test DELETE /api/events/:id : Vérifie si un événement est bien supprimé.

Test GET /api/events/isActive : Vérifie si l'événement actif est bien retourné.

--------------------------COMMENT TESTER-------------------------------------------------------
----------------------------npm run Tests----------------------------------------------------
----------------------------------PB MONGO_URL MUST BE DEFINED*/