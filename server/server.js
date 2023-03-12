const express = require('express')
const cors = require('cors')
require('dotenv').config({path:'./config/config.env'})
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const con = require('./db/connection')

app.use(require('./routes/route'))

con.then(db => {
    if(!db) return process.exit(1);
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`);
    })
    app.on('error',err=>console.log(`Failed to connect to HTTP ${err}`))
}).catch(err =>{
    console.log(`Connection failed ${err}`)
})

