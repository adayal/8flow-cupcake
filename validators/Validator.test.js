/**
 * @author: Amit Dayal
 * Test Validator
 * Test logic surrounding request validation
 */
import ResponseException from "../models/ResponseException.js";
import Validator from "./Validator.js";
import { beforeEach, describe, expect, test } from "@jest/globals";

describe("validate cupcake", () => {
    let validator = new Validator();
    let request = {
        body: {}
    };
    beforeEach(() => {
        request.body = {}
    });

    test("validate empty cupcake", () => {
        expect(validator._validateCupcake(request)).toBe(false);
    });

    test("validate no name", () => {
        request.body.price = 10;
        request.body.description = "test";
        request.body.ingredients = ["test"];
        expect(validator._validateCupcake(request)).toBe(false);
    });

    test("validate no price", () => {
        request.body.name = "test";
        request.body.description = "test";
        request.body.ingredients = ["test"];
        expect(validator._validateCupcake(request)).toBe(false);
    });

    test("validate name not string", () => {
        request.body.name = 5;
        request.body.price = 10;
        request.body.description = "test";
        request.body.ingredients = ["test"];
        expect(validator._validateCupcake(request)).toBe(false);
    });

    test("validate price not number", () => {
        request.body.name = "test";
        request.body.price = "10";
        request.body.description = "test";
        request.body.ingredients = ["test"];
        expect(validator._validateCupcake(request)).toBe(false);
    });

    test("validate description not string", () => {
        request.body.name = "test";
        request.body.price = 10;
        request.body.description = 5;
        request.body.ingredients = ["test"];
        expect(validator._validateCupcake(request)).toBe(false);
    });

    test("validate ingredients not array", () => {
        request.body.name = "test";
        request.body.price = 10;
        request.body.description = "test";
        request.body.ingredients = "test";
        expect(validator._validateCupcake(request)).toBe(false);
    });

    test("validate successfully", () => {
        request.body.name = "test";
        request.body.price = 10;
        request.body.description = "test";
        request.body.ingredients = ["test"];
        expect(validator._validateCupcake(request)).toBe(true);
    });

});

describe("validate Id request", () => {
    let validator = new Validator();
    test("validate null request", () => {
        expect(validator._validateIdRequest(null)).toBe(false);
    })

    test("validate isNaN", () => {
        expect(validator._validateIdRequest("abc")).toBe(false);
    })

    test("validate succesfully", () => {
        expect(validator._validateIdRequest(10)).toBe(true);
    })
});

describe("Test validateIdRes", () => {
    let validator = new Validator();
    let res = {
        params: {}
    };
    let exception = new ResponseException("Invalid ID supplied", 400);
    test("validate null request", () => {
        expect(() => {
            res.params.cupcakeId = {};
            validator.validateIdRes(res)
        }).toThrow(exception);
    });

    test("validate success", () => {
        expect(() => {
            res.params.cupcakeId = 1;
            validator.validateIdRes(res)
        }).not.toThrow(exception);
    });
});

describe("Test validateAddRes", () => {
    let validator = new Validator();
    let request = {
        body: {}
    }
    let exception = new ResponseException("Invalid Input", 400);
    test("validate null request", () => {
        expect(() => {
            validator.validateAddRes(request)
        }).toThrow(exception);
    });

    test("validate success", () => {
        expect(() => {
            validator.validateIdRes(request)
        }).not.toThrow(exception);
    });
})

describe("Test validateUpdateRes", () => {
    let validator = new Validator();
    let request = {
        body: {},
        params: {}
    }

    beforeEach(() => {
        request.body = {};
        request.params = {};
    })

    test("validate invalid id", () => {
        let exception = new ResponseException("Invalid ID supplied", 400);
        request.params.cupcakeId = null;
        expect(() => {
            validator.validateUpdateRes(request)
        }).toThrow(exception);
    })

    test("validate cupcake", () => {
        let exception = new ResponseException("Validation exception", 405);
        request.params.cupcakeId = 1;
        expect(() => {
            validator.validateUpdateRes(request)
        }).toThrow(exception);
    })

    test("validate success", () => {
        let exception = new ResponseException("Invalid Input", 400);
        request.params.cupcakeId = 1;
        request.body.name = "test";
        request.body.price = 10;
        request.body.description = "test";
        request.body.ingredients = ["test"];

        expect(() => {
            validator.validateUpdateRes(request)
        }).not.toThrow(exception);
    })
})