/**
 * @author: Amit Dayal
 * Main file for Cupcake App. Setup app settings here
 */
import express, { json } from "express";
import ErrorHandler from "./middlewares/ErrorHandler.js";
import {Routes} from "./routes/Routes.js"

/**
 * Setup express app with port
 */
const port = process.env.PORT || 1234;
const app = express();

/**
 * Set the root path and set all routes
 */
app.use(json());
app.use("/cupcake", new Routes().attach());
/**
 * Setup custom error handler
 */
app.use(ErrorHandler)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

export default app;