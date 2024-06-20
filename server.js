const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config');
const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/JobRoutes");
const employerRoutes = require("./routes/employerRoutes");
const jobSeekerRoutes = require("./routes/JobSeekerRoutes");

const app = express();
const port = 3000;

app.use(bodyParser.json());



app.use("/users", userRoutes);
app.use("/jobs", jobRoutes);
app.use("/employers", employerRoutes);
app.use("/candidates", jobSeekerRoutes);

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
}).catch(error => {
    console.error('Unable to synchronize the database:', error);
});;