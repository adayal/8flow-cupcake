# 8flow-cupcake Challenge

This is a simple express server designed to store information about cupcakes.
Instead of using a real database, I opted to use a .json file that is created at runtime. If the file already exists, it will be reused.
When running this server, the default port 1234 will be used. The port can be customized through a .env file
Based on the Swagger doc provided: 

# Base Path: /cupcake

# POST /

Add a cupcake to db

## Body: JSON of Cupcake

# GET /

Get all cupcakes

# GET /{cupcakeId}:

Get cupcake at id

# PUT /{cupcakeId}:

Update cupcake at id

# DELETE /{cupcakeId}:

Delete cupcake at id


# CUPAKE Definition
{
  id: int,
  name: string | required,
  description: string,
  price: number | required,
  ingredients: array[string]
}


# HOW TO BUILD

## Prequisites
Please make sure node is able to write to this folder. A file named CupcakeDB.json will be created at the root of this repo when running server.

```
npm install
```

# HOW TO RUN

```
npm start
```

# HOW TO TEST
```
npm test
```
