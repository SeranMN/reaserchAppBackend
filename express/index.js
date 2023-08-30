const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser')
require('dotenv').config()
const request = require('request');
const connectDB = require('./Config/connect');
const user = require('./API/user.api');

const port = process.env.PORT

const app = express();
app.use(cors());
app.use(bodyParser.json());


// app.get('/home', function (req, res) {
//     request(process.env.FLASK, function (error, response, body) {
//         console.error('error:', error); // Print the error
//         console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//         console.log('body:', body); // Print the data received
//         res.send(body); //Display the response on the website
//     });
// });

connectDB();

app.use('/user', user());

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
