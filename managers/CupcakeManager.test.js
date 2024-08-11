/**
 * @author: Amit Dayal
 * Test CupcakeManager logic
 */
import ResponseException from "../models/ResponseException.js";
import CupcakeManager from "./CupcakeManager.js";
import CupcakeModel from "../models/CupcakeModel.js";
import Repository from "../repositories/CupcakeRepository.js"; 
import { describe, expect, jest, test } from "@jest/globals";

let manager = new CupcakeManager();
let cupcake = new CupcakeModel("cupcake1", 1, "cupcake1", ["apple", "banana"]);
let notFoundException = new ResponseException("Cupcake not found", 404);

describe("validate add cupcake", () => {
    test("test add cupcake", async () => {
        jest.spyOn(Repository.prototype, "getCupcakes").mockImplementation(() => {
            return [cupcake];
        });

        jest.spyOn(Repository.prototype, "addCupcake").mockImplementation(() => {});
        expect(async () => {
            await manager.addCupcake(cupcake);

            jest.spyOn(Repository.prototype, "getCupcakes").mockImplementation(() => {
                return [cupcake];
            });

            let cupcakes = await manager.getAllCupcakes();
            expect(cupcakes.length).toBe(1);
            expect(cupcakes[0].name).toStrictEqual(cupcake.name);
            expect(cupcakes[0].description).toStrictEqual(cupcake.description);
            expect(cupcakes[0].ingredients).toStrictEqual(cupcake.ingredients);
            expect(cupcakes[0].price).toStrictEqual(cupcake.price);

        }).not.toThrow(ResponseException)
    });
});

describe("validate get cupcakes", () => {
    test("test get cupcake with invalid id", async () => {
        jest.spyOn(Repository.prototype, "getCupcakesById").mockImplementation((id) => {
            return null;
        });
        expect(async () => {
            await manager.getCupcake(1)
        }).rejects.toThrow(notFoundException)
    });

    test("test get cupcake with valid id", async () => {
        jest.spyOn(Repository.prototype, "getCupcakesById").mockImplementation((id) => {
            return cupcake;
        });
        expect(async () => {
            let get = await manager.getCupcake(1);
            expect(get).toBe(cupcake);
        }).not.toThrow(ResponseException)
    });

    test("test get all cupcakes", async() => {
        jest.spyOn(Repository.prototype, "getCupcakes").mockImplementation(() => {
            return [cupcake];
        });

        let cupcakes = await manager.getAllCupcakes();
        expect(cupcakes.length).toBe(1);
        expect(cupcakes[0]).toStrictEqual(cupcake);

    })
});

describe("validate delete cupcake", () => {
    test("test no cookie found exception", async() => {
        jest.spyOn(Repository.prototype, "getCupcakesById").mockImplementation((id) => {
            return null;
        });

        expect(async () => {
            await manager.deleteCupcake(1)
        }).rejects.toThrow(notFoundException)
    });

    test("test with cupcake found", async() => {
        jest.spyOn(Repository.prototype, "getCupcakesById").mockImplementation((id) => {
            return cupcake;
        });
        jest.spyOn(Repository.prototype, "removeCupcake").mockImplementation((id) => {
            return;
        });

        expect(async () => {
            await manager.deleteCupcake(1);
        }).not.toThrow(ResponseException)
    })
});


describe("validate update cupcake", () => {
    test("test with exception", async() => {

        jest.spyOn(Repository.prototype, "getCupcakesById").mockImplementation((id) => {
            return null;
        });

        expect(async () => {
            await manager.updateCupcake(cupcake.id, cupcake);
        }).rejects.toThrow(notFoundException);
    });

    test("test clean", async() => {

        jest.spyOn(Repository.prototype, "getCupcakesById").mockImplementation((id) => {
            return cupcake;
        });

        jest.spyOn(Repository.prototype, "updateCupcakes").mockImplementation((id, cupcake) => {
            return;
        });

        expect(async () => {
            await manager.updateCupcake(cupcake.id, cupcake);
        }).not.toThrow(ResponseException);
    });
});