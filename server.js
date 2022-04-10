import { coinFlip,coinFlips,countFlips,flipACoin } from "./modules/coin.mjs";

import minimist from 'minimist';
import express from 'express';

import { createRequire } from 'module';
const require = createRequire(import.meta.url)

const express = require('express')
const app = express()

const minimist = require('minimist')
const { exit } = require('process')

var argv = minimist(process.argv.slice(2))
var argPort = argv['port']
const HTTP_PORT = argv[allowedName] || 5000

// start an app server
const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',HTTP_PORT))
});

// checks status endpoint 
app.get('/app/', (req, res) => {
        res.statusCode = 200;
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
});

// for flip function 
app.get('/app/flip/', (req,res) => {
    res.statusCode = 200;
    let flip = coinFlip()
    res.json({flip: flip})
})

// for count flips function
app.get('/app/flips/:number', (req, res) => {
    res.statusCode = 200;
    let result = coinFlips(req.params.number)
    let coinflip_summary = countFlips(result)
    res.json({ raw: result, summary: coinflip_summary})
})

// If not recognized, default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});