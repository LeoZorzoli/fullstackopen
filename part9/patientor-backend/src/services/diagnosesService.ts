import diagnosesList from '../../data/diagnoses';

import { DiagnoseType } from '../types';

const getDiagnoses = (): DiagnoseType[] => {
    return diagnosesList;
};

export default {
    getDiagnoses,
};
