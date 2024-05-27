const db = require('../_helpers/db');

module.exports = {
    create,
    getAll,
    getById,
    update,
    delete: _delete
};

async function create(appointmentData) {
    try {
        const appointment = await db.Appointment.create(appointmentData);
        return basicDetails(appointment);
    } catch (error) {
        throw error;
    }
}

async function getAll() {
    try {
        const appointments = await db.Appointment.findAll();
        return appointments.map(appointment => basicDetails(appointment));
    } catch (error) {
        throw error;
    }
}

async function getById(id) {
    try {
        const appointment = await getAppointment(id);
        return basicDetails(appointment);
    } catch (error) {
        throw error;
    }
}

async function update(id, appointmentData) {
    try {
        const appointment = await getAppointment(id);
        await appointment.update(appointmentData);
        return basicDetails(appointment);
    } catch (error) {
        throw error;
    }
}

async function _delete(id) {
    try {
        const appointment = await getAppointment(id);
        await appointment.destroy();
    } catch (error) {
        throw error;
    }
}

async function getAppointment(id) {
    const appointment = await db.Appointment.findByPk(id);
    if (!appointment) throw 'Appointment not found';
    return appointment;
}

function basicDetails(appointment) {
    const { id, name, email, date, reason } = appointment;
    return { id, name, email, date, reason };
}
