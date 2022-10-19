const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const URL = process.env.DB_URL;

mongoose.connect(URL, () => {
    app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
    });
})