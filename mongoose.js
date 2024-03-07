const { default: mongoose } = require("mongoose");

mongoose.connect("mongodb://localhost:27017/CodesForTomorrow")
.then(()=>console.log("Connected")).catch(()=>console.log("Not Connected"))