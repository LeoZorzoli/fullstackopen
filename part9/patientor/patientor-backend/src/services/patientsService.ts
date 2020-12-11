import patientsList from '../../data/patients';

import { PatientsType, NonSensitivePatient, NewPatientEntry } from '../types';

import { v4 as uuid } from "uuid";

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

const addPatient = (patient: NewPatientEntry): PatientsType => {
    const newPatient = { ...patient, id: uuid() };
    patientsList.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    getNonSensitivePatients,
    addPatient
};