import diagnosesData from '../../data/diagnoses';

import { Diagnose } from '../types';

const getDiagnoses = (): Array<Diagnose> => {
    return diagnosesData;
};

export default {
    getDiagnoses,
};
