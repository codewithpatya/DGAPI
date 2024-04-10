const express = require('express')
const app = express();
const reader = require('xlsx')
const cors = require('cors')
// const mongoose = require("mongoose")
require("dotenv/config")


// middleware
app.use(express.json())
app.use(cors())

// reading excel data 
app.get("/readexcelfile",(req,res)=>{
    
    let data = []
    try {
        const file = reader.readFile('publicfiles/' + "Data" + ".xlsx");
        const sheetNames = file.SheetNames

        for (let i = 0; i < sheetNames.length; i++) {
            const arr = reader.utils.sheet_to_json(
                file.Sheets[sheetNames[i]])
                arr.forEach((res)=>{
                    data.push(res)
                })
            
        }
        res.send(data);
    } catch (error) {
        res.send(error.message);
    }  
})





// start server
app.listen(process.env.PORT, function() {
    console.log("node app is running on port 3000");
})

// connection
// async function main() {
//     const res = await mongoose.connect(process.env.DB)
//         const data = res.default
//         console.log(data.STATES['1']);
// }
// main()

