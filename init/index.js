// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Language = require("../models/language.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/DevHub"; // creating a name for table in db 

// main()
//     .then(() =>{
//         console.log("connected to DB");
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// async function main(){
//     await mongoose.connect(MONGO_URL);
// }

// const initDB = async () => {
//     try{
//         await Language.deleteMany({});

//         console.log("Inserting data:", initData.data);
//         await Language.insertMany(initData.data);
//         console.log("data was initialized");

//         mongoose.connection.close();
//     }catch(error){
//         console.log("Data insertion error:", error);
//     }
// };

const mongoose = require("mongoose");
const initData = require("./data.js");
const Language = require("../models/language.js");

mongoose.connect("mongodb://127.0.0.1:27017/DevHub")
    .then(async () => {
        console.log("Connected to DB");
        
        await Language.deleteMany({});
        await Language.insertMany(initData.data);
        console.log("Data initialized successfully!");
        
        mongoose.connection.close();
    })
    .catch(err => console.log("Error:", err));