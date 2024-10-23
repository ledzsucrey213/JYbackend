const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

// Middleware d'authentification et d'autorisation
const { authMiddleware, adminOrManager } = userController;

// Route de connexion (ouverture de session pour admin et manager)
router.post('/login', userController.login);

// Routes protégées : accès uniquement pour admin ou manager
router.get('/', authMiddleware, adminOrManager, userController.getUsers);  // Liste des utilisateurs
router.post('/', authMiddleware, adminOrManager, userController.createUser);  // Création d'un utilisateur
router.get('/:id', authMiddleware, adminOrManager, userController.getUserById);  // Récupérer un utilisateur par ID
router.put('/:id', authMiddleware, adminOrManager, userController.updateUser);  // Mettre à jour un utilisateur
router.delete('/:id', authMiddleware, adminOrManager, userController.deleteUser);  // Supprimer un utilisateur
router.get('/role/:role', authMiddleware, adminOrManager, userController.getUsersByRole);  // Récupérer les utilisateurs par rôle

module.exports = router;
