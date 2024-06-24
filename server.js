import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './config.js';
import { errorHandler } from './Exceptions/VaidationMiddleware.js';
import userController from "./controllers/user.controller.js";
import movieController from "./controllers/movie.controller.js";
import watchlistController from "./controllers/watchlist.controller.js";
import reviewController from "./controllers/reviewRating.controller.js";
import dotenv from 'dotenv';
const app = express();
const port = 3000;
dotenv.config();
app.use(bodyParser.json());



app.use("/users", userController);
app.use("/movie",movieController);
app.use("/watchlist",watchlistController);
app.use("/review", reviewController);

app.use(errorHandler);



sequelize.sync().then(() => {  
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
}).catch(error => {
    console.error('Unable to synchronize the database:', error);
});;