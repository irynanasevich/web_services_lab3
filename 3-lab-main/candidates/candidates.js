const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.argv.slice(2)[0];

app.use(bodyParser.json());

const election =[
    {id: 0, name:'honest'},
    {id: 1, name:'dishonest'},
];

const candidates = [
    {
        id: 10,
        numCandidate: 1,
        name: 'Iryna',
        surname: 'Nasevich',
        yearOfBirth: 2001,
        election: [0],
    },
    {
        id: 11,
        numCandidate: 2,
        name: 'Daniil',
        surname: 'Privalov',
        yearOfBirth: 2001,
        election: [0],

    },
    {
        id: 12,
        numCandidate: 3,
        name: 'Anton',
        surname: 'Serzhant',
        yearOfBirth: 2001,
        election: [1],

    },
    {
        id: 13,
        numCandidate: 4,
        name: 'Angelina',
        surname: 'Korol',
        yearOfBirth: 2001,
        election: [1],
    },
    {
        id: 14,
        numCandidate: 5,
        name: 'Anastasia',
        surname: 'Borisenko',
        yearOfBirth: 2003,
        election: [1],
    },
];

app.get('/candidates', (req, res) => {
    console.log('Returning candidates list');
    res.send(candidates);
});
app.get('/election', (req, res) => {
    console.log('Returning election list');
    res.send(election);
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
  
  
  console.log(`candidates service listening on port ${port}`);
  app.listen(port);