/** @jsxImportSource @emotion/react */
/*
JS file for displaying card for single day weather data 
*/

//Importing dependencies
import { css } from '@emotion/react';
import { getWeatherIcon, ConvertDate, formatProbPrec } from './Search';
import {BsCloudRain} from 'react-icons/bs';
import {FaTemperatureHigh, FaTemperatureLow} from 'react-icons/fa';

const dayForecastStyles = css `
    border: 0.2px solid #CACFD2;
    border-radius: 10px;
    margin-right: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 10px;
    width: 200px;
`;

const dayDescriptionStyles = css`
    margin: 0 auto;
    text-align: center;
    h3{
        margin: 0;
        color: #CACFD2
    }
    padding-bottom: 5px;
    border-bottom: 0.2px solid #CACFD2;
`;

const dayPrecipitationStyles = css `
    display: flex;
    flex-direction : row;
    p{
        margin :0;
        padding-top: 10px;
        padding-left: 5px;
        font-size: 14px;
        color: #CACFD2;
    }
`;
const maxTempDayForecastStyles = css `
    display : flex;
    flex-direction: row;
    p{
        margin :0;
        padding-top: 10px;
        padding-left: 5px;
        font-size: 14px;
        color: #CACFD2;
    }
`;
function getDayAndDate(stringDate){
    for (var i=0; i < stringDate.length; i++){
        if (stringDate.charAt(i) == ","){
            return [stringDate.substring(0, i), stringDate.substring(i + 1)]
        }
    }

}
//DOM rendering for card
function DayForecast(props) {
    const [day ,date] = getDayAndDate(ConvertDate(props.date, props.timezone));
    return (
        <div css = {dayForecastStyles}>
            <div css={dayDescriptionStyles}>
                <h3>{day}</h3>
                <h3>{date}</h3>
                <img src={getWeatherIcon(props.weatherIcon)} />
                <h3>{props.description}</h3>
            </div>
            <div css ={dayPrecipitationStyles}>
                <BsCloudRain css ={{
                    height: '15px',
                    width: '15px',
                    paddingTop: '10px',
                    paddingLeft: '5px'
                }}/>
                <p>Precipitation chance : {formatProbPrec(props.probPrec)} %</p>
            </div>
            <div css = {maxTempDayForecastStyles}>
                <FaTemperatureHigh css ={{
                    height: '15px',
                    width: '15px',
                    paddingTop: '10px',
                    paddingLeft: '10px'
                }}/>
                <p>Max: {props.high} &#8457;</p>
            </div>
            <div css = {maxTempDayForecastStyles}>
                <FaTemperatureLow css ={{
                    height: '15px',
                    width: '15px',
                    paddingTop: '10px',
                    paddingLeft: '10px'
                }}/>
                <p>Min: {props.low} &#8457;</p>
            </div>
        </div >
    )
}

export default DayForecast
