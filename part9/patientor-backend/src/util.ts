import { NewPatientEntry, Gender } from './types';

const isString = (text: any): text is string => {
    return typeof text === "string" || text instanceof String;
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseGender = (gender: any): Gender => {
    if(!gender || !isString(gender) || !isGender(gender.toLowerCase())) {
        throw new Error(`Incorrect or missing gender: ${gender || ""}`);
    }

    return gender.toLowerCase() as Gender;
};

export const parseToString = (param: any, paramName: string): string => {
    if(!param || !isString(param)) {
        throw new Error(`Incorrect or missing ${paramName}: ${param || ""}`);
    }

    return param;
};

const parseToDate = (param: any, paramName: string): string => {
    if(!param || !isString(param) || !isDate(param)) {
        throw new Error(`Incorrect or missing ${paramName}: ${param || ""}`);
    }

    return param;
};

export const toNewPatientEntry = (object: any): NewPatientEntry => {
    return {
        name: parseToString(object.name, "name"),
        occupation: parseToString(object.occupation, "occupation"),
        gender: parseGender(object.gender),
        ssn: parseToString(object.ssn, "social security number"),
        dateOfBirth: parseToDate(object.dateOfBirth, "date of birth"),
    };
};
