/*
JS file for displaying card for single day weather data 
*/

//Importing dependencies
import { getWeatherIcon, ConvertDate, formatProbPrec } from './Search';

//DOM rendering for card
function DayForecast(props) {
    return (
        <div>
            <p>-------------------------------------------</p>
            <ul>
                <li>Date: {ConvertDate(props.date, props.timezone)}</li>
                <li>High: {props.high} F</li>
                <li>Low: {props.low} F</li>
                <li>Probability of precipitation: {formatProbPrec(props.probPrec)} %</li>
                <li>Description: {props.description}</li>
                <li>Weather icon:
                    <br />
                    <img src={getWeatherIcon(props.weatherIcon)} />
                </li>
            </ul>
        </div >
    )
}

export default DayForecast
