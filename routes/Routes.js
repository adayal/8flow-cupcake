/**
 * @author: Amit Dayal
 * Setup subpath routes
 */

import express from "express";
import CupcakeController from "../controllers/CupcakeController.js"


class Routes {
    constructor() {
        this.controller = new CupcakeController()
    }

    /**
     * Set the verbs for subpaths
     * @returns express router
     */
    attach() {
        return express.Router()
            .post("/", this.controller.addCupcake.bind(this.controller))
            .get("/", this.controller.getCupcakes.bind(this.controller))
            .get("/:cupcakeId", this.controller.getCupcakeById.bind(this.controller))
            .put("/:cupcakeId", this.controller.updateCupcakeById.bind(this.controller))
            .delete("/:cupcakeId", this.controller.deleteCupcakeById.bind(this.controller))
    }
}

export {Routes};