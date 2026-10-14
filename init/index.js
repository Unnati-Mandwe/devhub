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
if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

const mongoose = require("mongoose");
const initData = require("./data.js");
const Language = require("../models/language.js");

async function initializeDatabase() {
    if (!process.env.ATLASDB_URL) {
        throw new Error("ATLASDB_URL must be set in the environment");
    }

    try {
        await mongoose.connect(process.env.ATLASDB_URL);
        await Language.deleteMany({});
        await Language.insertMany(initData.data);
        console.log("Data initialized successfully!");
    } finally {
        await mongoose.disconnect();
    }
}

initializeDatabase().catch((err) => {
    console.error("Database initialization failed:", err);
    process.exitCode = 1;
});
