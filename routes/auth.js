module.exports = db => {
  const express = require('express')
  const router = express.Router()
  const authController = require('../controllers/authController')(db)

  /**
   * @openapi
   * /login:
   *   post:
   *     tags:
   *       - Authentication
   *     summary: Authentifie un utilisateur
   *     description: Renvoie un token JWT
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 description: L'adresse e-mail de l'utilisateur
   *                 example: test@test.com
   *               password:
   *                 type: string
   *                 description: Le mot de passe de l'utilisateur
   *                 example: XXXXXXXX
   *     responses:
   *       200:
   *         description: Authentification réussie
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *                   description: Le token JWT
   *                   example: XXXXXXXXXXXX
   *       404:
   *         description: Utilisateur non trouvé
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   description: Le message d'erreur
   *                   example: User not found
   *       401:
   *         description: Mot de passe incorrect
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   description: Le message d'erreur
   *                   example: Bad credentials
   *       500:
   *         description: Erreur serveur
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   description: Le message d'erreur
   */
  router.post('/', authController.login)

  return router
}
