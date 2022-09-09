const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const route = require('./route/routes.js');
const { default: mongoose } = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://pattamu:iKHwECgQCaYNVpge@sandeepcluster.9rzkh.mongodb.net/reunion_Assaignment?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use("/api/", route)

app.listen(process.env.PORT || 3000, (err)=> {
    console.log("Connected to PORT 3000")
})