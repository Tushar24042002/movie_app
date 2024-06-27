import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './config.js';
import { errorHandler } from './Exceptions/VaidationMiddleware.js';
import userController from "./controllers/user.controller.js";
import movieController from "./controllers/movie.controller.js";
import watchlistController from "./controllers/watchlist.controller.js";
import reviewController from "./controllers/reviewRating.controller.js";
import dotenv from 'dotenv';
import cors from "cors";
const app = express();
app.use(cors());
dotenv.config();
const port =   5000;
app.use(bodyParser.json());



app.use("/users", userController);
app.use("/movie",movieController);
app.use("/watchlist",watchlistController);
app.use("/review", reviewController);

app.use(errorHandler);


// sequelize.authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });
sequelize.sync().then(() => {  
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
}).catch(error => {
    console.error('Unable to synchronize the database:', error);
});;