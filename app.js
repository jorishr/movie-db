const express = require('express');
const app = express();
const port = 3000;
const rp = require('request-promise');
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true})); 

app.set('view engine', 'ejs'); 

//  API data

let apiKey = 'apikey=thewdb'; 
let baseUrl = `http://www.omdbapi.com/?${apiKey}`;

//  local server port

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


//  ==========
//  routes
//  ==========

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/results', (req, res) => {
    let searchQuery = req.query.movieSearch  //  name tag form
    rp(`${baseUrl}&s=${searchQuery}`).then((body) => {  //  API request
        let parsedData = JSON.parse(body);
        res.render('results', {parsedData: parsedData});
    })
    .catch((err) => {
        console.log('Error:', err);
    });
});

//  ==========
//  error handling
//  ==========

app.use(function (req, res, next) {
    res.status(404).send('Sorry can\'t find that!')
});
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});