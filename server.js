const express = require('express');
const path = require('path');
const fs = require('fs');
const { parse } = require('path');


const app = express();
const PORT = process.env.PORT || 8080;


 app.use(express.urlencoded({ extended: true}));
 app.use(express.json());
 app.use(express.static("public"))

 app.get('/api/notes/:id', function(req, res) {
    fs.readFile('./db/db.json', 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        console.log(data)
        var parseData = JSON.parse(data)

        var selectedData = {};

        parseData.forEach(note => {
            if(note.id === req.params.id ) {
                selectedData = note;
            }
        })

        return res.json(selectedData);
      })
});
app.get('/', function(req, res) {
res.sendFile(path.join(__dirname, "./public/index.html"));
 });

 app.get('/notes', function(req, res) {
     res.sendFile(path.join(__dirname, "./public/notes.html"));
 });

app.get('/api/notes', function(req, res) {
 fs.readFile('./db/db.json', 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        console.log(data)
        var parseData = JSON.parse(data)
        return res.json(parseData);
      })
    
});
 app.post('/api/notes', function(req, res) {

    var input = req.body;

    fs.readFile('./db/db.json', 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        console.log(data)
        var parseData = JSON.parse(data)     

    input.id = parseData[parseData.length-1].id + 1;

    parseData.push(input);

    console.log(parseData);

    fs.writeFile('./db/db.json', JSON.stringify(parseData), function (err) {
        if (err) throw err;
        console.log('Saved!');

        res.json("Note added!");
      });

    })
     

 });


 app.delete('/api/notes/:id', function(req, res) {
    fs.readFile('./db/db.json', 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        console.log(data)
        var parseData = JSON.parse(data)

        // var targetIndex = 0;

        // parseData.forEach((note, index) => {
        //     console.log(note.id + " vs. " + req.params.id)
        //     if(note.id == req.params.id ) {
        //         targetIndex = index;
        //     }
        // })

        // console.log(targetIndex)

        // parseData.splice(targetIndex, 1);

        console.log(req.params.id)

        const updatedData = parseData.filter(note => note.id != req.params.id);


        fs.writeFile('./db/db.json', JSON.stringify(updatedData), function (err) {
            if (err) throw err;
            console.log('Deleted!');
    
            res.json("Note deleted!");
          });
    
      })
 });


 app.listen(PORT, () => {
     console.log(`App listening on PORT: ${PORT}`);
 });