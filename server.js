//Import modules to create connection to mongoose db and routes"
const express = require('express');
const db = require('./config/connection');
const routes = require('./controllers');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

//When connection is open, server starts
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});