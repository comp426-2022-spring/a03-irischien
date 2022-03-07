import { coinFlip,coinFlips,countFlips,flipACoin } from "./modules/coin.mjs";


import minimist from 'minimist';
import express from 'express';

const express = require('express')
const app = express()

var argv = minimist(process.argv.slice(2))
var allowedName = 'port'
const HTTP_PORT = argv[allowedName] || 5000

// start an app server
const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',HTTP_PORT))
});

app.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
});

app.get('/app/flip/', (req,res) => {
    res.statusCode = 200;
    let flip = coinFlip()
    res.json({flip: flip})
    res.writeHead(res.statusCode, {'Content-Type' : 'application/json' });
})

app.get('/app/flips/:number', (req, res) => {
    res.statusCode = 200;
    var number = req.params.number;
    let raw = coinFlips(number)
    let summary = countFlips(raw)
    res.json({ raw: raw, summary: summary})
    //res.json(summary)
    res.writeHead(res.statusCode, {'Content-Type' : 'application/json' });
})

app.get('/app/flip/call/heads', (req, res) => {
    res.statusCode = 200;
    let result = flipACoin('heads')
    res.send(result)
    res.writeHead(res.statusCode, {'Content-Type' : 'text/plain' });
})

app.get('/app/flip/call/tails', (req, res) => {
    res.statusCode = 200;
    let result = flipACoin('tails')
    res.send(result)
    res.writeHead(res.statusCode, {'Content-Type' : 'text/plain' });
})

// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});