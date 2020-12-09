import patientsList from '../../data/patients';

import { PatientsType, NonSensitivePatient } from '../types';

const getPatients = (): PatientsType[] => {
    return patientsList;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patientsList.map(({ id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export default {
    getPatients,
    getNonSensitivePatients
};