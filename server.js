const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const jobsRoutes = require('./server/routes/jobs');

const app = express();

//  Bodyparser Middleware
app.use(bodyParser.json());

//  DB Config
const db = require('./server/config/keys').mongoURI;

//  Connect MongoDB
mongoose
    .connect(db)
    .then(() => console.log("MongoDB Conneected..."))
    .catch((error) => console.log(error));

app.use('/api/jobs', jobsRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on post ${port}`));