import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './config.js';
// import jobRoutes from "./controllers/JobRoutes.js";
import { errorHandler } from './Exceptions/VaidationMiddleware.js';
import userController from "./controllers/user.controller.js";
import employerController from "./controllers/employer.controller.js"
import JobContoller from "./controllers/job.controller.js";
import IndustryController from "./controllers/industry.controller.js";
import Industry from './models/Industry.js';
import JobIndustry from './models/JobIndustry.js';
import { initializeAssociations } from './services/associationService.js';
initializeAssociations()
  .then(() => {
    console.log('Database synchronized and associations initialized successfully.');
    // Start your application logic here
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });

const app = express();
const port = 3000;

app.use(bodyParser.json());



app.use("/users", userController);
app.use("/employer",employerController);
app.use("/job",JobContoller);
app.use("/industry", IndustryController)

app.use(errorHandler);



sequelize.sync({force : true}).then(() => {  
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
}).catch(error => {
    console.error('Unable to synchronize the database:', error);
});;