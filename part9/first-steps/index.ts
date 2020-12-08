import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

import { calculateBmi } from './calculateBmi';
import { calculateExercises } from './exerciseCalculator';


app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
    const { height, weight } = _req.query;
    const result = calculateBmi(Number(height), Number(weight));
    res.json(result);
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/no-unsafe-assignment
    const { target, dailyExercises }: any = req.body;
    
    if (!target || !dailyExercises) {
        return res.status(400).json({ error: "parameters missing" });
      }
    
      if (!Array.isArray(dailyExercises)) {
        return res.status(400).json({ error: "malformatted parameters" });
      }
    
      const hasNaNInDailyHours = dailyExercises.some((hours) => isNaN(hours));
    
      if (isNaN(target) || hasNaNInDailyHours) {
        return res.status(400).json({ error: "malformatted parameters" });
      }
    
    const response = calculateExercises(Number(target), dailyExercises);

    console.log({ response });
    return res.json(response);

});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});