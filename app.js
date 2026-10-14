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

const dbUrl = process.env.ATLASDB_URL;
const port = process.env.PORT || 8080;

app.use (express.static(path.join(__dirname,"/public")));
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"/views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);

app.get ("/", (req,res) => {
    res.redirect("/languages");
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

// Search language names, ignoring letter case.
app.get("/languages/search", async (req, res) => {
    const query = String(req.query.q || "").trim();
    if (!query) {
        return res.redirect("/languages/viewall");
    }

    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const allLanguages = await Language.find({
        name: { $regex: escapedQuery, $options: "i" }
    }).sort({ name: 1 });

    res.render("languages/search.ejs", { allLanguages, query });
});

//Show Route 
app.get("/languages/:id", async(req,res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        throw new ExpressError(404, "Language not found");
    }
    const language = await Language.findById(id);
    if (!language) {
        throw new ExpressError(404, "Language not found");
    }
    res.render("languages/detail.ejs", {language});
});

//Error Route
app.all("/*splat", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next)=>{

    const { statusCode = 500, message = "Something went wrong!" } = err;
    res.status (statusCode).render("error.ejs", { message });
});

async function start() {
    if (!dbUrl) {
        throw new Error("ATLASDB_URL must be set in the environment");
    }
    await mongoose.connect(dbUrl);
    console.log("Connected to database");
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}

start().catch((err) => {
    console.error("Failed to start application:", err);
    process.exitCode = 1;
});
