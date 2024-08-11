/**
 * @author: Amit Dayal
 * Data store file for managing cupcake data.
 * Currently data is stored as a json array in a file called "CupcakeDB.json"
 * or whatever is set by .env file
 * 
 * If file already exists, it will be reused; otherwise it will be created new
 */
import { promises as fs, constants } from 'fs';
import ResponseException from '../models/ResponseException.js';
class CupcakeRepository {
    /**
     * @default: Filename set
     * @param {fileName} fileName 
     */
    constructor(fileName = "./CupcakeDB.json"){
        this.dbFile = process.env.fileName || fileName;
    }

    /**
     * Add a CupcakeModel to json file
     * @param {CupcakeModel} cupcake 
     */
    async addCupcake(cupcake){
        let jsonObj = await this._getFileJson();
        cupcake.id = this._generateId(jsonObj)
        jsonObj.push(cupcake)
        await fs.writeFile(this.dbFile, JSON.stringify(jsonObj))
    }

    /**
     * Get all CupcakeModels in array
     * @returns {Array} CupcakeModels
     */
    async getCupcakes(){
        return await this._getFileJson();
    }

    /**
     * Get single cupcake stored at a specific id
     * @param {int} id 
     * @returns {CupcakeModel} cupcake stored at id
     */
    async getCupcakesById(id) {
        let dict = await this._getDictJson()
        return dict[id];
    }

    /**
     * Remove cupcake from json file at a given id
     * @param {int} id 
     */
    async removeCupcake(id){
        let jsonObj = await this._getDictJson();
        delete jsonObj[id]
        let res = this._convertDictToArr(jsonObj)

        await fs.writeFile(this.dbFile, JSON.stringify(res))
    }

    /**
     * Update a cupcake in json with another cupcake instance
     * @param {int} id 
     * @param {CupcakeModel} cupcake 
     */
    async updateCupcakes(id, cupcake){
        let dict = await this._getDictJson();
        dict[`${id}`] = cupcake;
        let res = this._convertDictToArr(dict)
        await fs.writeFile(this.dbFile, JSON.stringify(res))
    }

    /**
     * Return the array form of dictionary (unsorted)
     * @param {Object} dict 
     * @returns {Array}
     */
    _convertDictToArr(dict) {
        let result = []
        for (let key in dict) {
            result.push(dict[key])
        }
        return result;
    }

    /**
     * Get the json file store in the form of an array of objects
     * @returns {Array} array of objects inside db
     */
    async _getFileJson() {
        await this._initDB();
        const stringJson = await fs.readFile(this.dbFile, 'utf8')
        let jsonArr = stringJson.length > 0 ? JSON.parse(stringJson) : []
        return jsonArr;
    }

    /**
     * Returns a dictionary where the key is the id of the cupcake and the value is the cupcake json
     * @returns {Object} key value store of objects in db
     */
    async _getDictJson() {
        await this._initDB();
        const stringJson = await fs.readFile(this.dbFile, 'utf8')
        let jsonArr = stringJson.length > 0 ? JSON.parse(stringJson) : []
        let dict = {}
        jsonArr.forEach(value => {
            dict[value.id] = value
        })
        return dict;
    }

    /**
     * Inititalize db. Check to see if db file exists, otherwise create it
     * Must have correct permissions in order to create
     */
    async _initDB() {
        try {
            await fs.access(this.dbFile, constants.R_OK, constants.W_OK)
        } catch {
            await fs.writeFile(this.dbFile, JSON.stringify([]), (err)=> {
                throw new ResponseException("DB_ERROR: Unable to write file", 500, err)
            })
        }
    }

    /**
     * Increment the previous id in json array and return it - used for add
     * @param {CupcakeModel} jsonObj 
     * @returns {int} id
     */
    _generateId(jsonObj) {
        let prevId = jsonObj[jsonObj.length - 1]?.id ?? 0;
        return ++prevId;
    }
}

export default CupcakeRepository;