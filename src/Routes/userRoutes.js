const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

// Middleware d'authentification et d'autorisation
const { authMiddleware, adminOrManager } = userController;

// Route de connexion (ouverture de session pour admin et manager)
router.post('/login', userController.login);

// Routes protégées : accès uniquement pour admin ou manager
router.get('/', userController.getUsers);  // Liste des utilisateurs
router.post('/', userController.createUser);  // Création d'un utilisateur
router.get('/:id', userController.getUserById);  // Récupérer un utilisateur par ID
router.put('/:id', userController.updateUser);  // Mettre à jour un utilisateur
router.delete('/:id', userController.deleteUser);  // Supprimer un utilisateur
router.get('/role/:role', userController.getUsersByRole);  // Récupérer les utilisateurs par rôle
router.get('/me', authMiddleware, userController.getCurrentUser);

module.exports = router;
