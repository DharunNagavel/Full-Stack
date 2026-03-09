const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
let responses = [];
app.get("/responses", (req, res) => {
    res.json(responses);
});
app.post("/submit", (req, res) => {
    const { name, email, rating, feedback } = req.body;
    const survey = {
        name,
        email,
        rating,
        feedback
    };
    responses.push(survey);
    res.send(`
        <h2>Thank you for your feedback!</h2>
        <a href="/">Go Back</a>
    `);
});
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});