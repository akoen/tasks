const express = require("express");
const {SimpleCalDAV} = require("simple-caldav");

const davClient = new SimpleCalDAV("http://galah:5232/alex/32a980f4-ce6d-e46d-143c-2baeb2a8d7bf")
const events = davClient.listEvents()

events.then(i => {
    console.log(i)
    app.get("/api", (req, res) => {
        res.json(i);
    })}
)

const PORT = process.env.PORT || 3001;
const app = express();

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});