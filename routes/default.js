const express = require('express')
const router = express.Router()
const defaultController = require('../controllers/defaultController')

/**
 * @openapi
 * /:
 *   get:
 *     tags:
 *       - Default
 *     description: Retourne le message de bienvenue
 *     responses:
 *       200:
 *         description: Un message de bienvenue
 */
router.get('/', defaultController.index)

/**
 * @openapi
 * /contact:
 *   get:
 *     tags:
 *       - Default
 *     description: Retourne le message de contact
 *     responses:
 *       200:
 *         description: Un message de contact
 */
router.get('/contact', defaultController.contact)

module.exports = router
