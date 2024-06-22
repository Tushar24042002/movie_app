import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './config.js';
// import jobRoutes from "./controllers/JobRoutes.js";
import { errorHandler } from './Exceptions/VaidationMiddleware.js';
import userController from "./controllers/user.controller.js";
import employerController from "./controllers/employer.controller.js"
import JobContoller from "./controllers/job.controller.js";
// import jobSeekerRoutes from "./controllers/JobSeekerRoutes.js";

const app = express();
const port = 3000;

app.use(bodyParser.json());



app.use("/users", userController);
app.use("/employer",employerController);
app.use("/job",JobContoller);

app.use(errorHandler);
// app.use("/jobs", jobRoutes);
// app.use("/employers", employerRoutes);
// app.use("/candidates", jobSeekerRoutes);

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
}).catch(error => {
    console.error('Unable to synchronize the database:', error);
});;