import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Forecast = ({ url }) => {
    const [forecastData, setForecastData] = useState([])

    const fetchForecastData = async () => {
        const response = await axios.get(url)
        console.log(response.data.forecast.forecastday[0].hour)
        setForecastData(response.data.forecast.forecastday[0].hour)
    }

    useEffect(() => {
        fetchForecastData()
    }, [])

    return (
        <div className="forecast-container">
            {forecastData.map((hour) => {
                const { text, icon } = hour.condition
                return (<div className="forecast" key={hour.time_epoch}>
                    <h2>{hour.time.split(" ")[1]}</h2>
                    {/* <h3>{text}</h3> */}
                    <img src={icon} alt={text}></img>
                </div>)
            })}
        </div>
    )
}

export default Forecast
