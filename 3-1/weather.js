let weatherSlot = document.getElementById("weatherSlot")
let cityInput = document.getElementById("cityInput")
let citySubmit = document.getElementById("citySubmit")

citySubmit.addEventListener('click', displaybyCity)

function displayAtlanta() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=atlanta&appid=feeb1e15933c3850daf212f6801a413c&units=imperial')
        .then(response => response.json())
        .then(weather => {
            const weatherInfo = `
    <li>City ${weather.name}</li>
    <li>Low of ${weather.main.temp_min}</li>
    <li>High of ${weather.main.temp_max}</li>
    <li>Pressure ${weather.main.pressure}</li>
    `
            weatherSlot.innerHTML = weatherInfo
        })
}
displayAtlanta()


function displaybyCity() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=feeb1e15933c3850daf212f6801a413c&units=imperial`)
        .then(response => response.json())
        .then(weather => {
            const weatherInfo = `
    <li>City  ${weather.name} </li>
    <li>Low of ${weather.main.temp_min}</li>
    <li>High of ${weather.main.temp_max}</li>
    <li>Pressure ${weather.main.pressure}</li>
  `
            weatherSlot.innerHTML = weatherInfo
        })
}

function failure() {
    window.alert("CAN NOT FIND LOCATION")
}

function success(position) {
    const { latitude, longitude } = position.coords;
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=feeb1e15933c3850daf212f6801a413c&units=imperial`)
        .then(response => response.json())
        .then(weather => {
            const weatherInfo = `
        <li>City ${weather.name}</li>
        <li>Low of ${weather.main.temp_min}<li>
        <li>High of ${weather.main.temp_max}</li>
        <li>Pressure ${weather.main.pressure}</li>
        `
            weatherSlot.innerHTML = weatherInfo
        })
}

navigator.geolocation.getCurrentPosition(success, failure)


