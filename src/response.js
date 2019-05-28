
/**
 *
 * @param {Object} error
 * @returns {Object}
 */
const generateError = (error) => {
    const message = error.message;

    return {
        type: 'ERROR',
        entity: error.name,
        message,
    }
}

const generateErrorMessage = (error, message) => {
    return {
        type: 'ERROR',
        entity: error,
        message: message,
    }
}

/**
 *
 * @param {Object} object
 * @param {string} message
 * @returns {Object}
 */
const generateResponse = (object, messageObject) => {
    const message = messageObject;
    const entity = object;

    return {
        type: 'RESPONSE',
        entity: entity,
        message,
    }
}

module.exports = {
    generateError,
    generateResponse,
    generateErrorMessage,
}