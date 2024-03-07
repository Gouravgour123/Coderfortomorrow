const express = require('express');
const { userRoutes } = require('./Routers/routes');
const app = express();
require('./DbConnection/mongoose')
const PORT = 4400;
app.use(express.json());

app.use("/home",userRoutes)

app.listen(PORT, ()=>{
    console.log(`server is running at ${PORT}`)
})