/*
Search component file containing helper functions, custom React hook components and rendering daily and weekly weather data
*/

// Importing dependencies
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import fetch from 'isomorphic-unfetch';
import WeeklyForecast from './WeeklyForecast';
import Map from './Map';
import '../styling/Search.css';

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

    //rendering the component here in return function
    return (
        <div>
            <div>
                <form onSubmit={(e) => {
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
                {/* {coordinates1.latitude != "" && <Map latitude={coordinates1.latitude} longitude={coordinates1.longitude} />} */}
                {/* Load Error if any*/
                isError && <h1>Error message!</h1>
                }
                {isLoading ? (<h1>Loading...</h1>) : (<div>
                    {checkCoordinates.latitude != "" && <div>
                        <Map latitude={checkCoordinates.latitude} longitude={checkCoordinates.longitude} />
                        <h1>Location: {formatLocation(checkLocationDetails.city, checkLocationDetails.state, checkLocationDetails.country)}</h1><ul><li>Latitude: {checkCoordinates.latitude}</li><li>Longitude: {checkCoordinates.longitude}</li></ul></div>}
                    {dailyDetails.high != "" && <div>
                        <h2>Current date: {ConvertDate(weatherData.current.dt, weatherData.timezone)}</h2>
                        <h3>Daily details: </h3>
                        <ul>
                            <li>Maximum temperature: {dailyDetails.high} F</li>
                            <li>Minimum temperature: {dailyDetails.low} F</li>
                            <li>Propability of precipitation: {formatProbPrec(dailyDetails.probPrec)} %</li>
                            <li>Weather Description: {dailyDetails.description} </li>
                            <li> Weather icon:
                            <br />
                                <img src={getWeatherIcon(dailyDetails.weatherIcon, "dt")} /></li>
                        </ul>
                        <WeeklyForecast weeklyDetails={weeklyDetails} timeZone={weatherData.timezone} />
                    </div>}
                </div>)}
            </div>
        </div>
    )
}

export default Search
