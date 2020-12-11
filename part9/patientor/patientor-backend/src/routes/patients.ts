import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatientEntry } from '../util';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
    res.send(patientsService.getNonSensitivePatients());
});

patientsRouter.post('/', (req, res) => {
    try {
        const newPatient = toNewPatientEntry(req.body);
        const addNewPatient = patientsService.addPatient(newPatient);
        res.json(addNewPatient);
    } catch (e) {
        res.status(400).send({error: e.message});
    }
});

export default patientsRouter;