const db = require('../_helpers/db');

module.exports = {
    create,
    getAll,
    getById,
    update,
    delete: _delete
};

async function create(reviewData) {
    try {
        const review = await db.Review.create(reviewData);
        return basicDetails(review);
    } catch (error) {
        throw error;
    }
}

async function getAll() {
    try {
        const reviews = await db.Review.findAll();
        return reviews.map(review => basicDetails(review));
    } catch (error) {
        throw error;
    }
}

async function getById(id) {
    try {
        const review = await getReview(id);
        return basicDetails(review);
    } catch (error) {
        throw error;
    }
}

async function update(id, reviewData) {
    try {
        const review = await getReview(id);
        await review.update(reviewData);
        return basicDetails(review);
    } catch (error) {
        throw error;
    }
}

async function _delete(id) {
    try {
        const review = await getReview(id);
        await review.destroy();
    } catch (error) {
        throw error;
    }
}

async function getReview(id) {
    const review = await db.Review.findByPk(id);
    if (!review) throw 'Review not found';
    return review;
}

function basicDetails(review) {
    const { id, rating, feedback, createdAt, updatedAt } = review;
    return { id, rating, feedback, createdAt, updatedAt };
}
