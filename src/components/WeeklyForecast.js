import { render } from '@testing-library/react';
import DayForecast from './DayForecast';

function WeeklyForecast(props) {
    console.log("Inside Weekly forecast", props.dailyDetails);
    const arrayLength = props.dailyDetails.date.length - 1;

    const createIndexArray = (arrayLength) => {
        var i = 0
        var indexedArray = Array(arrayLength)
        while (i <= arrayLength) {
            indexedArray[i] = i;
            i++;
        }
        return indexedArray
    }

    const referenceIndexArray = createIndexArray(arrayLength);

    return (
        <div>
            {referenceIndexArray.map(index => <DayForecast key={props.dailyDetails.date[index]} timezone={props.timezone} date={props.dailyDetails.date[index]} high={props.dailyDetails.high[index]} low={props.dailyDetails.low[index]} probPrec={props.dailyDetails.probPrec[index]} description={props.dailyDetails.description[index]} weatherIcon={props.dailyDetails.weatherIcon[index]} />)}
        </div>
    )
}

export default WeeklyForecast
