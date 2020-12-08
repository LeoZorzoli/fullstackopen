interface BmiValues {
    height: number;
    weight: number
}

const parseArguments = (args: Array<string>): BmiValues => {
    if(args.length < 4) throw new Error('Not enought arguments');
    if(args.length > 4 ) throw new Error('Too many arguments');

    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

export const calculateBmi = (height: number, weight: number) => {
    const heightInM = height / 100;
    const bmi = weight / heightInM / heightInM;

    if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
        if (bmi < 15) return {weight, height, bmi: 'Very severely underweight'};
        else if (bmi > 15 && bmi < 16) return {weight, height, bmi: 'Severely underweight'};
        else if (bmi > 16 && bmi < 18.5) return {weight, height, bmi: 'Underweight'};
        else if (bmi > 18.5 && bmi < 25) return {weight, height, bmi: 'Normal (healthy weight)'};
        else if (bmi > 25 && bmi < 30) return {weight, height, bmi: 'Overweight'};
        else if (bmi > 30 && bmi < 35) return {weight, height, bmi: 'Obese Class I (Moderately obese)'};
        else if (bmi > 35 && bmi < 40) return {weight, height, bmi: 'Obese Class II (Severely obese)'};
        else return {weight, height, bmi: 'Obese Class III (Very severely obese)'};
    } else {
        return { error: "malformatted parameters" };
    }
};

const isCalledDirectly = require.main === module;

if (isCalledDirectly) {
    try {
        const { height, weight } = parseArguments(process.argv);
        calculateBmi(height, weight);
    } catch (e) {
        console.log('Error, something bad happend, message: ', e.message);
    }
}
