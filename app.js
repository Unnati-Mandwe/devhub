if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

const express=require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Language = require ("./models/language.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const MongoStore = require('connect-mongo');

// const MONGO_URL = "mongodb://127.0.0.1:27017/DevHub";
const dbUrl = process.env.ATLASDB_URL;
main()
    .then(() =>{
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main(){
    await mongoose.connect(dbUrl);
};

app.use (express.static(path.join(__dirname,"/public")));
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"/views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: "mysupersecretcode"
    },
    touchAfter: 24 * 3600,
});

store.on("error", () => {
    console.log("ERROR in MONGO SESSION STORE",err);
});

app.get ("/", (req,res) => {
    res.send("Hi, I am root");
});

//index route
app.get ("/languages", async(req,res) => {
    const featuredLanguages = await Language.find({}).limit(4);
    // const allLanguages = await Language.find({});
    res.render("languages/index.ejs", {featuredLanguages});
});

//View Page route
app.get ("/languages/viewall", async(req,res) => {
    const allLanguages = await Language.find({});
    res.render("languages/ViewAll.ejs", {allLanguages});
});

//Show Route 
app.get("/languages/:id", async(req,res) => {
    let { id } = req.params;
    const language = await Language.findById(id);
    res.render("languages/detail.ejs", {language});
});

//Error Route
app.all("/*splat", (req, re, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next)=>{

    console.log("========== ERROR ==========");
    console.log(err);
    console.log(err.message);
    console.log(err.stack);

    let{statusCode = 500 , message = "Something went Wrong! "} = err;
    res.status (statusCode).render("error.ejs", { message });
});


app.listen(8080, () => {
    console.log("server is listening to port 8080");
});