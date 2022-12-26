const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.argv.slice(2)[0];
const request = require('request');

app.use(bodyParser.json());

const electionsService = 'http://localhost:8082';

const electioneerings = [
    {
        id: 10,
        type: "isHead",
        assignedElections: 0,
    },
    {
        id: 11,
        type: "isntHead",
        assignedElections: 0,
    }
];


app.get('/electioneering', (req, res) => {
    console.log('Returning electioneering list');
    res.send(electioneerings);
});

app.post('/ ', (req, res) => {
    request.post({
        headers: { 'content-type': 'application/json' },
        url: `${electionsService}/user/${req.body.electionId}`,
        body: `{
          
      }`
    }, (err, electionsResponse, body) => {
        if (!err) {
            const electioneeringId = parseInt(req.body.electioneeringId);
            const electioneering = electioneerings.find(subject => subject.id === electioneeringId);
            electioneering.assignedElections = req.body.electionId;
            res.status(202).send(electioneering);
        } else {
            res.status(400).send({ problem: `election Service responded with issue ${err}` });
        }
    });
});


console.log(`electioneering service listening on port ${port}`);
app.listen(port);

