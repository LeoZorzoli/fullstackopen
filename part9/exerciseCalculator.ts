interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    raingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (target: number, hours: Array<number>) => {
    const trainingDaysArray = []
    for (var i = 0; i < hours.length; i++) {
        if (hours[i] !== 0){
            trainingDaysArray.push(hours[i])
        }
    }

    const totalHours = hours.reduce((a, b) => {
        return a + b
    }, 0);

    const averageHours = totalHours / hours.length


    let trainingSuccess;
    totalHours / hours.length >= target ? trainingSuccess = true : trainingSuccess = false

    let rate;
    let rateDescription;
    if (averageHours <= 1){
        rate = 1;
        rateDescription = 'Very bad!';
    } else if(averageHours > 1 && averageHours <= 2) {
        rate = 2;
        rateDescription = 'Not too bad but could be better';
    } else if(averageHours > 2){
        rate = 3;
        rateDescription = 'Very good!'
    }

    console.log ({
        periodLength: hours.length,
        trainingDays: trainingDaysArray.length,
        average: averageHours,
        success: trainingSuccess,
        target,
        rating: rate,
        raingDescription: rateDescription
    })
}

interface MultiplyValues {
    target: number,
    hours: Array<number>
}

const parseArgumentsHours = (args: Array<string>): MultiplyValues => {
    if(args.length < 4) throw new Error('Not enough arguments');

    const arrayHours = []

    for(var i = 3; i < args.length; i++){
        arrayHours.push(Number(args[i]))
    }

    if(!isNaN(Number(args[2]))) {
        return {
            target: Number(args[2]),
            hours: arrayHours
        }
    } else {
        throw new Error('Provided target NaN')
    }
}

try {
    const { target, hours } = parseArgumentsHours(process.argv);
    calculateExercises(target, hours)
} catch (e) {
    console.log('Error, something bad happend, message: ', e.message);
}