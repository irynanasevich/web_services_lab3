const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.argv.slice(2)[0];
const request = require('request');

app.use(bodyParser.json());

const candidatesService = 'http://localhost:8081';

const elections = [
    {
        id: 10,
        type: "honest",
        yearOfElection: 2022,
        isHead: true,
        candidate_id: 1,
        assignedCandidates: 0,
    },
    {
        id: 11,
        type: "dishonest",
        yearOfElection: 2022,
        isHead: true,
        candidate_id: 2,
        assignedCandidates: 0,
    }
];

app.get('/elections', (req, res) => {
    console.log('Returning election list');
    res.send(elections);
});

app.post('/candidates/**', (req, res) => {
    const candidateId = parseInt(req.params[0]);
    const foundCandidate = candidates.find(subject => subject.id === candidateId);
  
    if (foundCandidate) {
        for (let attribute in foundCandidate) {
            if (req.body[attribute]) {
                foundCandidate[attribute] = req.body[attribute];
                console.log(`Set ${attribute} to ${req.body[attribute]} in candidates: ${candidateId}`);
            }
        }
        res.status(202).header({Location: `http://localhost:${port}/candidates/${foundCandidate.id}`}).send(foundCandidate);
    } else {
        console.log(`candidates not found.`);
        res.status(404).send();
    }
  });
  
app.post('/assignment', (req, res) => {
    request.post({
        headers: { 'content-type': 'application/json' },
        url: `${candidatesService}/user/${req.body.candidateId}`,
        body: `{
          
      }`
    }, (err, candidatesResponse, body) => {
        if (!err) {
            const electionId = parseInt(req.body.electionId);
            const election = elections.find(subject => subject.id === electionId);
            election.assignedCandidates = req.body.candidateId;
            res.status(202).send(election);
        } else {
            res.status(400).send({ problem: `candidate Service responded with issue ${err}` });
        }
    });
});


console.log(`elections service listening on port ${port}`);
app.listen(port);

