console.log('Hola API clima');

function getWeather() {
    console.log('Button clicked');
    
    let lat = document.getElementById('latitude-input').value;
    let lon = document.getElementById('longitude-input').value;
    
    if (lat == '' || lon == '') {
        alert('Please enter latitude and longitude');
        return;
    }
    
    let button = document.getElementById('fetch-btn');
    button.innerHTML = 'Loading...';
    button.disabled = true;
    
    fetchWeather(lat, lon);
}

function fetchWeather(latitude, longitude) {
    let url = 'https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&current_weather=true';
    
    console.log('Fetching: ' + url);
    
    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log('Data received:', data);
        
        if (data.current_weather) {
            let temp = data.current_weather.temperature;
            let wind = data.current_weather.windspeed;
            
            document.getElementById('temp-display').textContent = temp;
            document.getElementById('wind-display').textContent = wind;
            document.getElementById('weather-result').style.display = 'block';
        } else {
            alert('No weather data for these coordinates');
        }
    })
    .catch(function(error) {
        console.log('Error:', error);
        alert('Error: ' + error.message);
    })
    .finally(function() {
        let button = document.getElementById('fetch-btn');
        button.innerHTML = 'Get Weather';
        button.disabled = false;
    });
}

window.onload = function() {
    console.log('Page loaded');
    document.getElementById('fetch-btn').addEventListener('click', getWeather);
};