/* 
JS file for formatting the weekly weather data in an array to individual daily cards
*/

//Importing dependencies
import { render } from '@testing-library/react';
import DayForecast from './DayForecast';

//Function to return separate array of indices for elements in the weekly response data
function WeeklyForecast(props) {
    //console.log("Inside Weekly forecast", props.weeklyDetails);
    const arrayLength = props.weeklyDetails.date.length - 1;

    const createIndexArray = (arrayLength) => {
        var i = 0
        var indexedArray = Array(arrayLength)
        while (i <= arrayLength) {
            indexedArray[i] = i;
            i++;
        }
        return indexedArray
    }

    //store that separate array of indices as referenceIndexArray 
    const referenceIndexArray = createIndexArray(arrayLength);

    //create a card for each of the elements in the referenceIndexArray
    return (
        <div>
            {referenceIndexArray.map(index => <DayForecast key={props.weeklyDetails.date[index]} timezone={props.timezone} date={props.weeklyDetails.date[index]} high={props.weeklyDetails.high[index]} low={props.weeklyDetails.low[index]} probPrec={props.weeklyDetails.probPrec[index]} description={props.weeklyDetails.description[index]} weatherIcon={props.weeklyDetails.weatherIcon[index]} />)}
        </div>
    )
}

export default WeeklyForecast
