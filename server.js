const express = require('express');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 8080;


 app.use(express.urlencoded({ extended: true}));
 app.use(express.json());


app.get('/', function(req, res) {
res.sendFile(path.join(__dirname, "./public/index.html"));
 });

 app.get('/notes', function(req, res) {
     res.sendFile(path.join(__dirname, "./public/notes.html"));
 });

app.get('/api/notes', function(req, res) {
    return res.json(getNotes);
});
 app.post('/api/notes', function(req, res) {
     return res.json(note);
 });

 app.delete('/api/notes/:id', function(req, res) {

 });


 app.listen(PORT, () => {
     console.log(`App listening on PORT: ${PORT}`);
 });