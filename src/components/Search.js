import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import fetch from 'isomorphic-unfetch';
import WeeklyForecast from './WeeklyForecast';


export const getWeatherIcon = (icon) => {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`
}

export const ConvertDate = (unixTime, timezone) => {
    console.log("Inside ConvertDate", unixTime);
    let date = new Date(unixTime * 1000);
    console.log("Date object earlier:", date);
    date = convertTZ(date, timezone);
    console.log("New date object:", date)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString("en-US", options);
}

export function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString }));
}

export const formatProbPrec = (prob) => {
    return (parseInt(parseFloat(prob) * 100)).toString()
}

const Search = ({ query }) => {
    console.log("Query==", query);
    const [inputQuery, setInputQuery] = useState(query || '');
    const [coordinates, setCoordinates] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [weatherData, setWeatherData] = useState({});
    const [cityName, setCityName] = useState('');
    const [stateName, setStateName] = useState('');
    const [countryName, setCountryName] = useState('');
    const [dailyDetails, setDailyDetails] = useState({ high: '', low: '', probPrec: '', description: '', weatherIcon: '' });
    const [newDailyDetails, setNewDailyDetails] = useState({ date: [], high: [], low: [], probPrec: [], description: [], weatherIcon: [] })
    const history = useHistory();
    console.log("History==", history);
    console.log("Input Query is:", inputQuery);

    const settingCoordinates = (latitude, longitude) => [latitude, longitude] || []



    const formatLocation = (city, state, country) => {
        if (state == "") {
            return city + " ," + country
        } else {
            return city + " ," + state + " ," + country
        }
    }

    const getDailyDetails = (dailyArray, dailyAttribute) => {
        console.log("Inside daily details");
        console.log("Daily array is:", dailyArray);

        var outputArray = []
        if (dailyAttribute == "dt" || dailyAttribute == "pop") {
            dailyArray.forEach((element) => {
                outputArray.push(element[dailyAttribute])
            });
        } else if (dailyAttribute == "max" || dailyAttribute == "min") {
            dailyArray.forEach((element) => {
                outputArray.push(element.temp[dailyAttribute])
            });
        } else {
            dailyArray.forEach((element) => {
                outputArray.push(element.weather[0][dailyAttribute])
            });
        }
        return outputArray
    }


    useEffect(() => {
        let ignore = false;
        const controller = new AbortController();
        console.log("Entering use effect:")
        async function fetchSearchResults() {
            console.log("Entered fetch search results");
            let responseBody, responseBody2 = {};
            setIsLoading(true);
            setIsError(false);
            console.log("Before try block");
            try {
                console.log("In Try block:");
                console.log(process.env);
                const api_key = process.env.REACT_APP_API_KEY;
                console.log(api_key);
                let res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${api_key}`, { signal: controller.signal });
                console.log("Fetched responses in try");
                responseBody = await res.json();
                console.log("Converted responses to json");
                console.log("Response body in try:", responseBody);
                if (!ignore) {
                    let [latitude, longitude, city, country] = [responseBody[0].lat, responseBody[0].lon, responseBody[0].name, responseBody[0].country];
                    console.log("Entered if block");
                    setCoordinates(settingCoordinates(latitude, longitude));
                    setCityName(city);
                    setCountryName(country);
                    if (responseBody[0].hasOwnProperty('state')) {
                        let state = responseBody[0].state
                        setStateName(state);
                    } else {
                        setStateName('');
                    }
                    //console.log("After set coordinates: ", coordinates);
                    try {
                        let res1 = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&appid=dd6f01bb350941d35bbda526d63f41d0`, { signal: controller.signal });
                        console.log("Fetched second response:");
                        responseBody2 = await res1.json();
                        console.log("Converted responses to json");
                        console.log("Response 2nd body:", responseBody2);
                        setWeatherData(responseBody2 || {});
                        setDailyDetails({ high: responseBody2.daily[0].temp.max, low: responseBody2.daily[0].temp.min, probPrec: responseBody2.daily[0].pop, description: responseBody2.current.weather[0].description, weatherIcon: responseBody2.current.weather[0].icon });
                        setNewDailyDetails({ ...newDailyDetails, date: getDailyDetails(responseBody2.daily, 'dt'), high: getDailyDetails(responseBody2.daily, 'max'), low: getDailyDetails(responseBody2.daily, 'min'), probPrec: getDailyDetails(responseBody2.daily, 'pop'), description: getDailyDetails(responseBody2.daily, 'description'), weatherIcon: getDailyDetails(responseBody2.daily, 'icon') });
                        // setNewDailyDetails({ ...newDailyDetails, high: getDailyDetails(responseBody2.daily, 'max') })
                        // setNewDailyDetails({ ...newDailyDetails, low: getDailyDetails(responseBody2.daily, 'min') })
                        // setNewDailyDetails({ ...newDailyDetails, probPrec: getDailyDetails(responseBody2.daily, 'pop') })
                        // setNewDailyDetails({ ...newDailyDetails, description: getDailyDetails(responseBody2.daily, 'description') })
                        // setNewDailyDetails({ ...newDailyDetails, weatherIcon: getDailyDetails(responseBody2.daily, 'icon') })
                        setIsLoading(false);
                    } catch (e) {
                        console.log("Error in second response:", e);
                    }
                    //console.log("Coordinates are:", coordinates);
                }
            } catch (e) {
                if (e instanceof DOMException) {
                    console.log("HTTP request aborted");
                } else {
                    setIsError(true);
                    console.log("Error message", e);
                }
            }
        }
        if (query) {
            fetchSearchResults();
            console.log("After fetch search result....Coordinates are:", coordinates);
        }
        console.log("Exiting use effect ")
        return () => {
            controller.abort();
            ignore = true;
        }
    }, [query]);
    console.log("Outside useEffect: Coordinates are:", coordinates);
    console.log("Outside useEffect: City name :", cityName);
    console.log("Outside useEffect: Country name:", countryName);
    console.log("Outside useEffect: State name:", stateName);
    console.log("Outside useEffect: Weather Data is:", weatherData);
    console.log("Daily details are:", dailyDetails);
    console.log("New Daily details are:", newDailyDetails);


    return (
        <div>
            <h2>Search component</h2>
            <div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    history.push(`?q=${inputQuery}`);
                    //alert(`Got:${inputQuery} `);
                }}>
                    <input value={inputQuery} onChange={e => setInputQuery(e.target.value)} />
                    <button type="submit">Submit</button>
                </form>
                {isError && <h1>Error message!</h1>}
                {isLoading ? (<h1>Loading...</h1>) : (<div>
                    {coordinates != undefined || coordinates.length != 0 && <div><h1>Location: {formatLocation(cityName, stateName, countryName)}</h1><ul><li>Latitude: {coordinates[0]}</li><li>Longitude: {coordinates[1]}</li></ul></div>}
                    {JSON.stringify(weatherData) != "{}" && <div><h2>Current date: {ConvertDate(weatherData.current.dt, weatherData.timezone)}</h2>
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
                        <WeeklyForecast dailyDetails={newDailyDetails} timeZone={weatherData.timezone} />
                    </div>}
                </div>)}
            </div>
        </div>
    )
}

export default Search
