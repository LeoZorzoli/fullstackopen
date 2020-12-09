export interface DiagnoseType {
    "code": string;
    "name": string;
    "latin"?: string;
}

export interface PatientsType {
    "id": string;
    "name": string;
    "dateOfBirth": string;
    "ssn": string;
    "gender": Gender;
    "occupation": string;
}

export type NonSensitivePatient = Omit<PatientsType, 'ssn'>;

export type Gender = 'male' | 'female' | 'other';