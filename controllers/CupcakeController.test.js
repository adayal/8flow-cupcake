/**
 * @author: Amit Dayal
 * Test controller
 * Created custom test response class to pass into controller methods
 */
import CupcakeController from "./CupcakeController.js";
import CupcakeManager from "./../managers/CupcakeManager.js";
import CupcakeModel from "../models/CupcakeModel.js";
import { describe, expect, jest, test } from "@jest/globals";
import Validator from "../validators/Validator.js"
import ResponseException from "../models/ResponseException.js";


let controller = new CupcakeController();
let cupcake = new CupcakeModel("cupcake1", 1, "cupcake1", ["apple", "banana"]);
let request = {
    body: cupcake, 
    params: {
        cupcakeId: 1
    }
};
let ex = new ResponseException("test", 500);

class TestResponse {
    _status = 0;
    _data = null;

    sendStatus(status) {
        this._status = status;
        return this;
    }

    status(status) {
        this._status = status;
        return this;
    }

    getStatus() {
        return this._status;
    }

    getData() {
        return this._data;
    }

    json(data) {
        this._data = data;
        return this;
    }
}

describe("test add cupcake", () => {
    test("201 status", async() => {
        jest.spyOn(Validator.prototype, "validateAddRes").mockImplementation((req) => {
            return;
        });

        jest.spyOn(CupcakeManager.prototype, "addCupcake").mockImplementation((cake) => {
            return;
        });

        let res = await controller.addCupcake(request, new TestResponse());
        expect(res.getStatus()).toBe(201);
    });

    test("next called on exception", async() => {
        jest.spyOn(Validator.prototype, "validateAddRes").mockImplementation((req) => {
            throw ex;
        });

        const callback = jest.fn();


        await controller.addCupcake(request, new TestResponse(), callback);
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenLastCalledWith(ex);
    });
});

describe("test get all cupcakes", () => {
    test("clean get all", async () => {
        jest.spyOn(CupcakeManager.prototype, "getAllCupcakes").mockImplementation(() => {
            return [cupcake];
        });
        
        let mockResponse = new TestResponse();
        let res = await controller.getCupcakes(request, mockResponse);
        expect(res.getStatus()).toBe(200);
        expect(res.getData()).toStrictEqual([cupcake]);
    });

    test("get all exception", async () => {
        let mockResponse = new TestResponse();
        jest.spyOn(CupcakeManager.prototype, "getAllCupcakes").mockImplementation(() => {
            throw mockResponse;
        });
        const callback = jest.fn();

        
        await controller.getCupcakes(request, mockResponse, callback);
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenLastCalledWith(mockResponse);
    });
});

describe("test get cupcake by id", () => {
    test("clean get by id", async () => {
        jest.spyOn(CupcakeManager.prototype, "getCupcake").mockImplementation((id) => {
            return cupcake;
        });

        jest.spyOn(Validator.prototype, "validateIdRes").mockImplementation((req) => {
            return;
        });

        
        let mockResponse = new TestResponse();
        let res = await controller.getCupcakeById(request, mockResponse);
        expect(res.getStatus()).toBe(200);
        expect(res.getData()).toStrictEqual(cupcake);
    });

    test("get by id exception", async () => {
        let mockResponse = new TestResponse();
        jest.spyOn(Validator.prototype, "validateIdRes").mockImplementation((req) => {
            throw mockResponse;
        });
        const callback = jest.fn();

        
        await controller.getCupcakeById(request, mockResponse, callback);
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenLastCalledWith(mockResponse);
    });
});

describe("test update cupcakes by id", () => {
    test("clean update", async () => {
        jest.spyOn(CupcakeManager.prototype, "updateCupcake").mockImplementation((id, cupcake) => {
            return;
        });

        jest.spyOn(Validator.prototype, "validateUpdateRes").mockImplementation((req) => {
            return;
        });

        
        let mockResponse = new TestResponse();
        let res = await controller.updateCupcakeById(request, mockResponse);
        expect(res.getStatus()).toBe(204);
    });

    test("update exception", async () => {
        let mockResponse = new TestResponse();
        jest.spyOn(Validator.prototype, "validateUpdateRes").mockImplementation((req) => {
            throw mockResponse;
        });
        const callback = jest.fn();

        
        await controller.getCupcakeById(request, mockResponse, callback);
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenLastCalledWith(mockResponse);
    });
});

describe("test delete cupcakes by id", () => {
    test("clean delete", async () => {
        jest.spyOn(CupcakeManager.prototype, "deleteCupcake").mockImplementation((id, cupcake) => {
            return;
        });

        jest.spyOn(Validator.prototype, "validateIdRes").mockImplementation((req) => {
            return;
        });

        
        let mockResponse = new TestResponse();
        let res = await controller.deleteCupcakeById(request, mockResponse);
        expect(res.getStatus()).toBe(204);
    });

    test("delete exception", async () => {
        let mockResponse = new TestResponse();
        jest.spyOn(Validator.prototype, "validateIdRes").mockImplementation(() => {
            throw mockResponse;
        });
        const callback = jest.fn();

        
        await controller.deleteCupcakeById(request, mockResponse, callback);
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenLastCalledWith(mockResponse);
    });
});