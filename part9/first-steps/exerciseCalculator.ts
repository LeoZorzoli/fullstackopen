interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export const calculateExercises = (target: number, hours: Array<number>): Result => {
    const trainingDaysArray = [];
    for (let i = 0; i < hours.length; i++) {
        if (hours[i] !== 0){
            trainingDaysArray.push(hours[i]);
        }
    }

    const totalHours = hours.reduce((a, b) => {
        return a + b;
    }, 0);

    const averageHours = totalHours / hours.length;

    let trainingSuccess;
    totalHours / hours.length >= target ? trainingSuccess = true : trainingSuccess = false;

    let rate;
    let rateDescription;
    if (averageHours <= 1){
        rate = 1;
        rateDescription = 'Very bad!';
    } else if(averageHours > 1 && averageHours <= 2) {
        rate = 2;
        rateDescription = 'Not too bad but could be better';
    } else {
        rate = 3;
        rateDescription = 'Very good!';
    }

    return ({
        periodLength: hours.length,
        trainingDays: trainingDaysArray.length,
        average: averageHours,
        success: trainingSuccess,
        target,
        rating: rate,
        ratingDescription: rateDescription
    });
};

interface MultiplyValues {
    target: number,
    hours: Array<number>
}

const parseArgumentsHours = (args: Array<string>): MultiplyValues => {
    if(args.length < 4) throw new Error('Not enough arguments');

    const arrayHours = [];

    for(let i = 3; i < args.length; i++){
        arrayHours.push(Number(args[i]));
    }

    if(!isNaN(Number(args[2]))) {
        return {
            target: Number(args[2]),
            hours: arrayHours
        };
    } else {
        throw new Error('Provided target NaN');
    }
};

const isCalledDirectly = require.main === module;

if (isCalledDirectly) {
    try {
        const { target, hours } = parseArgumentsHours(process.argv);
        calculateExercises(target, hours);
    } catch (e) {
        console.log('Error, something bad happend, message: ', e.message);
    }
}