# 8flow-cupcake Challenge

This is a simple express server designed to store information about cupcakes.
Instead of using a real database, I opted to use a .json file that is created at runtime. If the file already exists, it will be reused.
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


# CUPAKE DEFINITION
{
  id: int,
  name: string | required,
  description: string,
  price: number | required,
  ingredients: array[string]
}
