const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize');
const reviewService = require('./reviews.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

function createSchema(req, res, next) {
    const schema = Joi.object({
        rating: Joi.number().integer().min(1).max(5).required(),
        feedback: Joi.string().optional()
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    reviewService.create(req.body)
        .then(review => res.status(201).json(review))
        .catch(next);
}

function getAll(req, res, next) {
    reviewService.getAll()
        .then(reviews => res.json(reviews))
        .catch(next);
}

function getById(req, res, next) {
    reviewService.getById(req.params.id)
        .then(review => review ? res.json(review) : res.sendStatus(404))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        rating: Joi.number().integer().min(1).max(5).empty(''),
        feedback: Joi.string().empty('')
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    reviewService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'Review updated successfully' }))
        .catch(next);
}

function _delete(req, res, next) {
    reviewService.delete(req.params.id)
        .then(() => res.json({ message: 'Review deleted successfully' }))
        .catch(next);
}
