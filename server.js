const express = require('express')
const app = express();
require('./mongoose')
const PORT = 4400;
app.use(express.json());


app.use("/home",)

app.listen(PORT, ()=>{
    console.log(`server is running at ${PORT}`)
})