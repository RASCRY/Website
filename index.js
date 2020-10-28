const { cache } = require('ejs');
const express = require('express');
const app = express();
const port = 3000;
const axios = require("axios").default;

var cached = false;

app.set('view engine', 'ejs');
app.use(express.static('static'));

app.get('/', async (req, res) => {
    res.set('x-powered-by', 'ARCTICNET-SERVER');
    res.set('server', 'ARCTICNET-SERVER');
    if (!cached) {
        var options = {
            method: 'GET',
            url: 'https://api.github.com/users/RASCRY/repos'
        };
        var response = await axios.request(options);
        cached = response.data;
        res.render('index', { repos: cached });
        setTimeout(() => { cached = false; }, 10000);
    }
    else {
        res.render('index', { repos: cached });
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
})