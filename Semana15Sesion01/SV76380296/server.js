const express = require("express");
const cors = require ("cors");
const cookieSession = require("cookie-session");
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }))

app.use(
    cookieSession({
        name: "auth-session",
        keys: ["COOKIE_SECRET"],
        httpOnly: true
    })
);

app.get("/", (req, res) => {
    res.send("Hola");
});

const dbConfig = require("./app/config/db.config")

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log("connected")
});

function initial() {
    
}