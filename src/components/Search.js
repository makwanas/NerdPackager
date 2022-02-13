/** @jsxImportSource @emotion/react */
/*
Search component file containing helper functions, custom React hook components and rendering daily and weekly weather data
*/

// Importing dependencies
import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { useHistory } from 'react-router-dom';
import fetch from 'isomorphic-unfetch';
import WeeklyForecast from './WeeklyForecast';
import Map from './Map';
import '../styling/Search.css';
//import { formStyles } from './GitView/GitViewHome'; 
import {BsCloudRain} from 'react-icons/bs';
import {FaTemperatureHigh, FaTemperatureLow} from 'react-icons/fa';

//Function to return weather icon URL
export const getWeatherIcon = (icon) => {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`
}

//Function to convert date given unixtime and timezone into localdatestring
export const ConvertDate = (unixTime, timezone) => {
    let date = new Date(unixTime * 1000);
    date = convertTZ(date, timezone);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString("en-US", options);
}

//Function to format probabilty and display in percentages
export const formatProbPrec = (prob) => {
    return (parseInt(parseFloat(prob) * 100)).toString()
}

//Function to return new date for a particular timezone
function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString }));
}

//Getting the daily weather API details and returning them all in the outputarray
const getDailyDetails = (dailyArray, dailyAttribute) => {

    var outputArray = []
    //check for date and percentage of precipitation
    if (dailyAttribute == "dt" || dailyAttribute == "pop") {
        dailyArray.forEach((element) => {
            outputArray.push(element[dailyAttribute])
        });
    }
    //Check for daily min and max temperatures 
    else if (dailyAttribute == "max" || dailyAttribute == "min") {
        dailyArray.forEach((element) => {
            outputArray.push(element.temp[dailyAttribute])
        });
    } 
    //Other attributes
    else {
        dailyArray.forEach((element) => {
            outputArray.push(element.weather[0][dailyAttribute])
        });
    }
    return outputArray
}

const searchStyles = css`
    color: white;
`;

const formStyles = css`
form{
    text-align: center;
    margin-top: 10px;
    padding-top: 10px;
    label{
        font-size: 20px;
        padding: 10px;
        border: 1px solid white;
        margin-top: 10px;
        border-radius: 5px;
        input{
            margin-left: 5px;
            margin-right: 5px;
            font-size: 20px;
            border-radius: 1px;
        }
        button{
            font-size: 20px;
            color: white;
            background-color: #313131;
            border: 1px solid white;
            border-radius: 5px;
        }
    }

}
width: fit-content;
margin: 0 auto;
`;

const dailyForecastStyles = css`
    display: flex;
    flex-direction: row;
    border: 1px solid #CACFD2;
    border-radius: 15px;
    padding:10px;
    width: fit-content;
    margin-left: 75px;
`;

const dailyForecastDetailStyles = css `
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    border-left: 0.2px solid #CACFD2;
    padding-left: 10px;
    h2{
        margin:0;
        font-size: 24px;
    }

`;

const coordinateStyles = css `
    display :flex;
    flex-direction: row;
    p{
        font-style: italic;
        font-size: 12px;
        color: #CACFD2;
        padding-left: 10px;
    }
`;

const temperatureStyles = css`
    display :flex;
    flex-direction: row;
`

const weatherDescriptionStyles = css `
    margin : 0 auto;
    text-align: center;
    h3{
        margin: 0;
        color: #CACFD2;
    }
    padding-bottom: 5px;
    border-bottom: 0.2px solid #CACFD2;
`;

const precipitationStyles = css`
    display: flex;
    flex-direction: row;
    p{
        margin :0;
        padding-top: 10px;
        padding-left: 10px;
        font-size: 16px;
        color: #CACFD2;
    }
    
`;

const maxTemperatureStyles = css `
    display: flex;
    flex-direction: row;
    flex: 1;
`;

const minTemperatureStyles = css `
    display: flex;
    flex-direction: row;
    flex: 1
`;


//Custom React hook for getting coordinates from search query
function useLocationString(query) {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [coordinates1, setCoordinates1] = useState({ latitude: '', longitude: '' });
    const [locationDetails, setLocationDetails] = useState({ city: '', state: '', country: '' })

    useEffect(() => {
        let ignore = false;
        const controller = new AbortController();

        // Async JS function to fetch coordinates from the search query
        async function fetchSearchResults() {
            let responseBody = {};
            setIsLoading(true);
            setIsError(false);
            try {
                const api_key = process.env.REACT_APP_API_KEY;
                let res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${api_key}`, { signal: controller.signal });
                responseBody = await res.json();

            }
            catch (e) {
                if (e instanceof DOMException) {
                    console.log("HTTP request aborted");
                } else {
                    setIsError(true);
                    console.log("Error message", e);
                }
            }
            //Setting the coordinate responses in the local state variable
            if (!ignore) {
                setCoordinates1({ ...coordinates1, latitude: responseBody[0].lat, longitude: responseBody[0].lon })
                if (responseBody[0].hasOwnProperty('state')) {
                    setLocationDetails({ ...locationDetails, city: responseBody[0].name, country: responseBody[0].country, state: responseBody[0].state })
                } else {
                    setLocationDetails({ ...locationDetails, city: responseBody[0].name, country: responseBody[0].country, state: '' })
                }
                setIsLoading(false);
            }
        }
        if (query) {
            fetchSearchResults();
        }
        return () => {
            controller.abort();
            ignore = true;
        }
    }, [query]);
    return [coordinates1, isLoading, isError, locationDetails]
}

//React Custom hook for getting weather info from the coordinates
const useCoordinatesToGetWeather = (coordinates) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [weatherData, setWeatherData] = useState({});
    const [dailyDetails, setDailyDetails] = useState({ high: '', low: '', probPrec: '', description: '', weatherIcon: '' });
    const [weeklyDetails, setWeeklyDetails] = useState({ date: [], high: [], low: [], probPrec: [], description: [], weatherIcon: [] })

    useEffect(() => {
        {
            let ignore = false;
            const controller = new AbortController();

            // Async JS function to fetch weather results from coordinates
            async function fetchWeatherResults() {
                let responseBody = {};
                setIsLoading(true);
                setIsError(false);
                try {
                    const api_key = process.env.REACT_APP_API_KEY;
                    let res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=imperial&appid=${api_key}`, { signal: controller.signal });
                    responseBody = await res.json();
                }
                catch (e) {
                    if (e instanceof DOMException) {
                        console.log("HTTP request aborted");
                    } else {
                        setIsError(true);
                        console.log("Error message", e);
                    }
                }

                //Setting the response data accordingly for daily and weekly weather info data
                if (!ignore) {
                    setWeatherData(responseBody || {});
                    setDailyDetails({ high: responseBody.daily[0].temp.max, low: responseBody.daily[0].temp.min, probPrec: responseBody.daily[0].pop, description: responseBody.current.weather[0].description, weatherIcon: responseBody.current.weather[0].icon });
                    setWeeklyDetails({ ...weeklyDetails, date: getDailyDetails(responseBody.daily, 'dt'), high: getDailyDetails(responseBody.daily, 'max'), low: getDailyDetails(responseBody.daily, 'min'), probPrec: getDailyDetails(responseBody.daily, 'pop'), description: getDailyDetails(responseBody.daily, 'description'), weatherIcon: getDailyDetails(responseBody.daily, 'icon') });
                    setIsLoading(false);
                }

            }
            if (coordinates.latitude != "") {
                fetchWeatherResults();
            }
            return () => {
                controller.abort();
                ignore = true;
            }
        }
    }, [coordinates]);

    return [weatherData, dailyDetails, weeklyDetails, isLoading, isError]
}

// Search component
const Search = ({ query }) => {
    const [inputQuery, setInputQuery] = useState(query || '');
    const history = useHistory();
    const [checkCoordinates, checkLoading, checkError, checkLocationDetails] = useLocationString(query);
    const [weatherData, dailyDetails, weeklyDetails, isLoading, isError] = useCoordinatesToGetWeather(checkCoordinates);

    // Format the response to display location accordingly 
    const formatLocation = (city, state, country) => {
        if (state == "") {
            return city + " ," + country
        } else {
            return city + " ," + state + " ," + country
        }
    }

    console.log("Inside search component: ", weeklyDetails);

    //rendering the component here in return function
    return (
        <div css ={searchStyles}>
            <div css ={formStyles}>
                <form
                    css = {{
                        width: ''
                    }} 
                    onSubmit={(e) => {
                        e.preventDefault();
                        //append the URL path with input query search term
                        history.push(`?q=${inputQuery}`);
                }}>
                    <label>
                        Enter your location:
                    <input value={inputQuery} onChange={e => setInputQuery(e.target.value)} />
                    <button type="submit">Submit</button>
                    </label>
                </form>
                <br />
                {/* Load Error if any*/
                isError && <h1>Error message!</h1>
                }
                {isLoading ? (<h1>Loading...</h1>) : 
                (<div>
                    <div >
                        <div>
                        {checkCoordinates.latitude != "" && 
                            <div css ={dailyForecastStyles}>
                            <Map latitude={checkCoordinates.latitude} longitude={checkCoordinates.longitude} />
                            <div css ={dailyForecastDetailStyles}>
                                <div css = {{
                                    borderBottom: '0.2px solid #CACFD2'
                                }}>
                                    <h2>
                                        {formatLocation(checkLocationDetails.city, checkLocationDetails.state, checkLocationDetails.country)}
                                    </h2>
                                    <div css ={coordinateStyles}>
                                        <p>Latitude: {checkCoordinates.latitude}</p>
                                        <p>Longitude: {checkCoordinates.longitude}</p>
                                    </div>
                                </div>
                                <div>
                                    {dailyDetails.high != "" &&
                                        <div>
                                            <div css = {weatherDescriptionStyles}>
                                            <h3>{ConvertDate(weatherData.current.dt, weatherData.timezone)}</h3>
                                            <img src={getWeatherIcon(dailyDetails.weatherIcon, "dt")} />
                                            <h3>{dailyDetails.description}</h3>
                                            </div>
                                            <div css ={precipitationStyles}>
                                                <BsCloudRain css ={{
                                                    height: '20px',
                                                    width: '20px',
                                                    paddingTop: '10px',
                                                    paddingLeft: '10px'
                                                }}/>
                                                <p>Precipitation chance : {formatProbPrec(dailyDetails.probPrec)} %</p>
                                            </div>
                                            <div css={temperatureStyles}>
                                                <div css = {maxTemperatureStyles}>
                                                    <FaTemperatureHigh css ={{
                                                    height: '20px',
                                                    width: '20px',
                                                    paddingTop: '10px',
                                                    paddingLeft: '10px'
                                                }}/>
                                                    <p css = {{
                                                        margin : '0',
                                                        paddingTop: '10px',
                                                        paddingLeft: '10px',
                                                        fontSize: '14px',
                                                        color: '#CACFD2',
                                                    }}>
                                                        Max : {dailyDetails.high} &#8457;
                                                        </p>
                                                </div>
                                                <div css = {minTemperatureStyles}>
                                                    <FaTemperatureLow css ={{
                                                    height: '20px',
                                                    width: '20px',
                                                    paddingTop: '10px',
                                                    paddingLeft: '10px'
                                                }}/>
                                                    <p css = {{
                                                        margin : '0',
                                                        paddingTop: '10px',
                                                        paddingLeft: '10px',
                                                        fontSize: '14px',
                                                        color: '#CACFD2',
                                                    }}>
                                                        Min : {dailyDetails.low} &#8457;
                                                    </p>
                                                </div>
                                            </div>
                                        </div>}
                                </div>
                            </div>
                            </div>}
                        </div>
                        
                    </div>
                    <div>
                        {
                            weeklyDetails && weeklyDetails.date.length !== 0 ?  
                                <WeeklyForecast weeklyDetails={weeklyDetails} timeZone={weatherData.timezone} />:
                                <div> </div>
                        }
                        
                    </div>
                </div>)}
            </div>
        </div>
    )
}

export default Search
