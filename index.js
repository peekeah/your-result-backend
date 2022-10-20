const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter = require('./routes/userRouter');
const resultRouter = require('./routes/resultRouter');
const auth = require('./middlewares/auth');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
    res.send('Tailweb Backend');
})


// Routes
app.use('/users', userRouter);
app.use('/result', auth.authenticateToken, auth.authorizeUser, resultRouter);


// MongoDB connection
const PORT = process.env.PORT || 5000;
const URL = process.env.DB_URL;

mongoose.connect(URL, () => {
    app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
    });
})