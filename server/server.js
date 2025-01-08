const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.CONN_STR)
.then(()=>{
  console.log("Connected to database....");
})
.catch((error)=>{
  console.log(error);
});

const port = process.env.PORT || 3000
app.listen(port,()=>{
  console.log(`Server is listening on port ${port}...`);
});