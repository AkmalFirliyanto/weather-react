import React, { useState } from "react";


const api = {
  key: "29f4952775706eeb4ba0ca00a36f9620",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if(evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => { 
        setWeather(result);
        setQuery('');
        console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "juli", "Agustus", "September", "Oktober", "November", "Desember" ];
    let days = [ "Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") 
    ? ((weather.main.temp > 20) 
      ? "app warm" 
      : "app") 
    : "app"}>
      <main>
        <div className="search-box">
          <input 
          type="text" 
          className="search-bar" 
          placeholder="Cari..." 
          onChange={e => setQuery(e.target.value)} 
          value={query}
          onKeyPress={search} 
          />        
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">
              {weather.weather[0].description}
            </div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
