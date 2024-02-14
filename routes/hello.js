const express = require('express')
const router = express.Router()
const helloController = require('../controllers/helloController')

/**
 * @openapi
 * /hello/{name}:
 *   get:
 *     tags:
 *       - Hello
 *     description: Retourne le message de bonjour avec le nom fourni
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: Prénom de la personne à saluer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Un message de bonjour
 */
router.get('/:name', helloController.helloGet)

/**
 * @openapi
 * /hello:
 *   post:
 *     tags:
 *       - Hello
 *     description: Envoie un message de bonjour avec le nom fourni dans le corps de la requête
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Prénom de la personne à saluer
 *     responses:
 *       200:
 *         description: Un message de bonjour
 */
router.post('/', helloController.helloPost)

module.exports = router
