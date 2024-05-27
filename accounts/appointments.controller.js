const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize');
const appointmentService = require('./appointments.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

function createSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        date: Joi.date().required(),
        reason: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    appointmentService.create(req.body)
        .then(appointment => res.status(201).json(appointment))
        .catch(next);
}

function getAll(req, res, next) {
    appointmentService.getAll()
        .then(appointments => res.json(appointments))
        .catch(next);
}

function getById(req, res, next) {
    appointmentService.getById(req.params.id)
        .then(appointment => appointment ? res.json(appointment) : res.sendStatus(404))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().empty(''),
        email: Joi.string().email().empty(''),
        date: Joi.date().empty(''),
        reason: Joi.string().empty('')
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    appointmentService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'Appointment updated successfully' }))
        .catch(next);
}

function _delete(req, res, next) {
    appointmentService.delete(req.params.id)
        .then(() => res.json({ message: 'Appointment deleted successfully' }))
        .catch(next);
}
