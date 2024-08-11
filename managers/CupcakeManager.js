/**
 * @author: Amit Dayal
 * Manager managers the flow of information from db to controller
 * This holds the logic defined in the spec and handling of edge conditions
 */
import ResponseException from "../models/ResponseException.js";
import Repository from "../repositories/CupcakeRepository.js";

class CupcakeManager {
    constructor() {
        this.db = new Repository();
    }

    /**
     * Add Cupake to db
     * @param {CupcakeModel} cupcake 
     */
    async addCupcake(cupcake) {
        await this.db.addCupcake(cupcake);
    }

    /**
     * Update cupcake at param id with param cupcake in db
     * If no cupcake found, return error with 404
     * @param {int} id 
     * @param {CupcakeModel} cupcake 
     */
    async updateCupcake(id, cupcake) {
        let getCupcake = await this.db.getCupcakesById(id);
        if (!getCupcake) {
            throw new ResponseException("Cupcake not found", 404);
        }
        cupcake.id = id;
        await this.db.updateCupcakes(id, cupcake);
    }

    /**
     * Return cupcake at param id.
     * If no cupcake found, return error with 404
     * @param {int} id 
     * @returns {CupcakeModel} cupcake
     */
    async getCupcake(id) {
        let cupcake = await this.db.getCupcakesById(id);
        if (!cupcake) {
            throw new ResponseException("Cupcake not found", 404);
        }
        return cupcake;
    }

    /**
     * Get all cupcakes from db
     * @returns {Array} Array of cupcakes
     */
    async getAllCupcakes() {
        return await this.db.getCupcakes();
    }

    /**
     * Delete cupcake with associated id
    * If no cupcake found, return error with 404
     * @param {int} id 
     */
    async deleteCupcake(id) {
        let cupcake =  await this.db.getCupcakesById(id);
        if (!cupcake) {
            throw new ResponseException("Cupcake not found", 404);
        }
        await this.db.removeCupcake(id);
    }

}

export default CupcakeManager;