
//Api config
const config = {
    apiWeather: {
        info: 'API Weather',
        apiWebsite: 'https://openweathermap.org/api',
        urlRacine: 'http://api.openweathermap.org',
        apiKey: process.env.VUE_APP_WEATHER
    },
    apiMapBox: {
        info: 'API Mapbox',
        apiWebsite: 'https://www.mapbox.com',
        urlRacine: '',
        apiKey: process.env.VUE_APP_MAPBOX
    }
}

export default config