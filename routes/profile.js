module.exports = db => {
  const express = require('express')
  const router = express.Router()
  const profileController = require('../controllers/profileController')(db)
  const auth = require('../middlewares/auth')

  /**
   * @openapi
   * /profile:
   *   get:
   *     security:
   *       - BearerAuth: []
   *     tags:
   *       - Profile
   *     summary: Détails de l'utilisateur connecté
   *     description: Retourne les détails de l'utilisateur connecté
   *     responses:
   *       200:
   *         description: Les détails de l'utilisateur au format JSON
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 _id:
   *                   type: string
   *                   description: L'identifiant de l'utilisateur
   *                 email:
   *                   type: string
   *                   description: L'adresse e-mail de l'utilisateur
   *                 role:
   *                   type: string
   *                   description: Le rôle de l'utilisateur
   *                 bakeryName:
   *                   type: string
   *                   description: Le nom de la boulangerie de l'utilisateur
   *       401:
   *         description: Token absent
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   description: Le message d'erreur
   *                   example: Unauthorized access
   *       403:
   *         description: Token invalide
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   description: Le message d'erreur
   *                   example: Forbidden access
   */
  router.get('/', auth, profileController.getProfile)

  return router
}
