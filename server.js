const express = require('express');
const app = express();
require('dotenv').config;

const bodyParser = require('body-parser')

app.use(bodyParser);
const PORT = process.env.PORT || 3000;



app.listen(PORT , ()=>{
    console.log(`App is listning on port ${PORT}`);
})