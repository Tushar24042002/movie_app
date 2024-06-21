import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './config.js';
// import jobRoutes from "./controllers/JobRoutes.js";
import userController from "./controllers/user.controller.js";
// import jobSeekerRoutes from "./controllers/JobSeekerRoutes.js";

const app = express();
const port = 3000;

app.use(bodyParser.json());



app.use("/users", userController);
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