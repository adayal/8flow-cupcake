import ResponseException from "../models/ResponseException.js";
import { afterEach,describe, expect, jest, test } from "@jest/globals";
import CupcakeRepository from "./CupcakeRepository.js";
import { promises as fs, constants } from 'fs';
import CupcakeModel from "../models/CupcakeModel.js";

let cupcake = new CupcakeModel("cupcake1", 1, "cupcake1", ["apple", "banana"]);
const fileName = "CupcakeDB.addtest.json";


describe("Test Init DB", () => {
    let fileName = "./CupcakeDB.test.json";
    let repo = new CupcakeRepository(fileName);
    

    afterEach(async () => {
        await fs.unlink(fileName)
    });

    test("no file", async () => {
       
        await repo._initDB();
        expect(async () => {
            await fs.access(fileName, constants.R_OK, constants.W_OK)
        }).not.toThrow(ResponseException)
    })

    test("empty file", async () => {
        await fs.writeFile(fileName, JSON.stringify([]))
        await repo._initDB();
        expect(async () => {
            await fs.access(fileName, constants.R_OK, constants.W_OK)
        }).not.toThrow(ResponseException)

        let read = await fs.readFile(fileName);
        expect(JSON.parse(read)).toStrictEqual([]);
    })

    test("file with data", async () => {
        fileName = "./CupcakeDB.test.json";
        let cupcake = new CupcakeModel("test", 100, "test", ["apple", "banana"])
        await fs.writeFile(fileName, JSON.stringify(cupcake))
        await repo._initDB();
        expect(async () => {
            await fs.access(fileName, constants.R_OK, constants.W_OK)
        }).not.toThrow(ResponseException)
        let read = await fs.readFile(fileName);
        let json = JSON.parse(read);
        expect(json.name).toBe(cupcake.name);
        expect(json.description).toBe(cupcake.description);
        expect(json.ingredients).toStrictEqual(cupcake.ingredients);
        expect(json.price).toBe(cupcake.price);
    })
});

describe("Test generate id", () => {
    let repo = new CupcakeRepository();
    test("empty array object provided", () => {
        let id = repo._generateId([]);
        expect(id).toBe(1);
    });

    test("non empty array provided", () => {
        let id = repo._generateId([{id: 100}]);
        expect(id).toBe(101);
    });
});