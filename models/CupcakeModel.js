/**
 * @author: Amit Dayal
 * CupcakeModel used to store request json in db
 */
class CupcakeModel {
    constructor(name, price, description, ingredients) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.ingredients = ingredients;
        this.id = -1;
    }
}

export default CupcakeModel;