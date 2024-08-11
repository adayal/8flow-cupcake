/**
 * @author: Amit Dayal
 * Main validator for incoming requests
 */

import ResponseException from "../models/ResponseException.js";
class Validator {
    constructor(){}

    /**
     * Validate cupcake json object and properties
     * Required fields are: name and price
     * Private method
     * @param {Request} req 
     * @returns boolean: true if valid, false otherwise
     */
    _validateCupcake(req) {
        if (!req) {
            return false;
        }

        const {name, price, description, ingredients} = req.body

        if (!name || !price ) {
            return false;
        }

        if (typeof name !== 'string' || typeof price !== 'number') {
            return false;
        }

        if (description && typeof description !== 'string') {
            return false;
        }

        if (ingredients && (!Array.isArray(ingredients) || !ingredients.every(ingredient => typeof ingredient === 'string'))) {
            return false;
        }
        return true;
    }

    /**
     * Validate requests where id is provided
     * Private method
     * @param {Request} req 
     * @returns boolean: true if valid, false otherwise
     */
    _validateIdRequest(req) {
        if (!req || isNaN(req)) {
            return false;
        }
        return true;
    }

    /**
     * Validate requests where id is provided
     * @param {Request} req 
     * @throws ResponseException if invalid
     */
    validateIdRes(req) {
        const cupcakeId = parseInt(req.params.cupcakeId);
        if (!this._validateIdRequest(cupcakeId)) {
            let message = "Invalid ID supplied";
            throw new ResponseException(message, 400)
        }
    }

    /**
     * Validate requests where a cupcake is provided for adding
     * @param {Request} req 
     * @throws ResponseException if invalid
     */
    validateAddRes(req) {
        if (!this._validateCupcake(req)) {
            let message = "Invalid Input";
            throw new ResponseException(message, 405)
        }
    }

    /**
     * Validate requests where a cupcake is provided for updating
     * @param {Request} req 
     * @throws ResponseException if invalid
     */
    validateUpdateRes(req) {
        const cupcakeId = parseInt(req.params.cupcakeId);

        if (!this._validateIdRequest(cupcakeId)) {
            let message = "Invalid ID supplied";
            throw new ResponseException(message, 400)
        }

        if (!this._validateCupcake(req)) {
            let message = "Validation exception";
            throw new ResponseException(message, 405)
        }
    }
}

export default Validator;