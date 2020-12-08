import express from 'express';
import diagnoseService from '../services/diagnosesService';

const router = express.Router();

router.get('/api/diagnoses', (_req, res) => {
    res.send(diagnoseService.getDiagnoses());
});

router.post('/', (_req, res) => {
    res.send('Saving');
});

export default router;