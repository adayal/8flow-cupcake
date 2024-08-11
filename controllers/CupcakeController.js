/**
 * @author: Amit Dayal
 * Controller controls how data flows from manager to router
 * When an exception occurs, the controller is responsible to passing it to the provided callback
 */
import CupcakeManager from "../managers/CupcakeManager.js";
import CupcakeModel from "../models/CupcakeModel.js";
import Validator from "../validators/Validator.js"

class CupcakeController {
    constructor() {
        this.manager = new CupcakeManager();
        this.validator = new Validator();
    }

    /**
     * Add cupcake to db
     * Send a 201 when added
     * @path POST /cupcakes
     * @param {Request} req 
     * @param {Response} res 
     * @param {Function} next 
     * @returns Response
     */
    async addCupcake(req, res, next) {
        try {
            this.validator.validateAddRes(req);
            const {name, price, description, ingredients} = req.body;
            
            let cupcake = new CupcakeModel(name, price, description, ingredients);
            await this.manager.addCupcake(cupcake);
            
            return res.sendStatus(201);
        } catch (exception) {
            next(exception);
        }
        
    }

    /**
     * Get all cupcakes
     * Send a 200 with json response
     * @path GET /cupcakes
     * @param {Request} req 
     * @param {Response} res 
     * @param {Function} next 
     * @returns Response
     */
    async getCupcakes(req, res, next) {    
        try {
            let cupcakes = await this.manager.getAllCupcakes();
            return res.status(200).json(cupcakes);
        } catch (exception) {
            next(exception)
        }
    }

    /**
     * Get cupcake at id
     * Send a 200 with json response
     * @path GET /:cupcakeId
     * @param {Request} req 
     * @param {Response} res 
     * @param {Function} next 
     * @returns Response
     */
    async getCupcakeById(req, res, next) {
        try {
            this.validator.validateIdRes(req);

            const cupcakeId = parseInt(req.params.cupcakeId);
            let cupcake = await this.manager.getCupcake(cupcakeId);

            return res.status(200).json(cupcake);
        } catch (exception) {
            next(exception)
        }
    }

     /**
     * Update cupcake at id
     * Send a 204 when complete
     * @path PUT /:cupcakeId
     * @param {Request} req 
     * @param {Response} res 
     * @param {Function} next 
     * @returns Response
     */
    async updateCupcakeById(req, res, next) {
        try {
            this.validator.validateUpdateRes(req);

            const cupcakeId = parseInt(req.params.cupcakeId);
            const {name, price, description, ingredients} = req.body;
            let cupcake = new CupcakeModel(name, price, description, ingredients);

            await this.manager.updateCupcake(cupcakeId, cupcake);

            return res.sendStatus(204);
        } catch (exception) {
            next(exception);
        }
    }

    /**
     * Delete cupcake at id
     * Send a 204 when complete
     * @path DELETE /:cupcakeId
     * @param {Request} req 
     * @param {Response} res 
     * @param {Function} next 
     * @returns Response
     */
    async deleteCupcakeById(req, res, next) {
        try {
            this.validator.validateIdRes(req);

            const cupcakeId = parseInt(req.params.cupcakeId);
            await this.manager.deleteCupcake(cupcakeId);

            return res.sendStatus(204);
        } catch (exception) {
            next(exception);
        }
    }
}

export default CupcakeController;